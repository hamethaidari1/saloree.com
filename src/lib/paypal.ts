import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

function getPayPalConfig() {
  const env = (process.env.PAYPAL_ENV || "sandbox").trim();
  const baseUrl = env.toLowerCase() === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

  const rawClientId = process.env.PAYPAL_CLIENT_ID;
  const rawClientSecret = process.env.PAYPAL_CLIENT_SECRET;

  const clientId = rawClientId ? rawClientId.trim() : "";
  const clientSecret = rawClientSecret ? rawClientSecret.trim() : "";

  const loggedClientId = clientId ? clientId.substring(0, 8) : "none";
  console.log(
    `[PayPal Config] Env: ${env}, Base URL: ${baseUrl}, Client ID (first 8): ${loggedClientId}, Secret exists: ${!!clientSecret}`
  );

  return {
    env,
    baseUrl,
    clientId,
    clientSecret,
  };
}

async function getPayPalAccessToken() {
  const { baseUrl, clientId, clientSecret } = getPayPalConfig();

  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials are invalid or Live/Sandbox environment is mismatched.");
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  
  const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("PayPal token error:", errorText);
    throw new Error("PayPal credentials are invalid or Live/Sandbox environment is mismatched.");
  }

  const data = await response.json();
  return data.access_token;
}

export const createPayPalOrderFn = createServerFn({ method: "POST" })
  .validator((items: { productId: string; quantity: number }[]) => items)
  .handler(async ({ data: items }) => {
    // Verify payment amount on server
    let serverTotal = 0;
    
    for (const item of items) {
      const { data: product, error } = await supabase
        .from("products")
        .select("price")
        .eq("id", item.productId)
        .single();
        
      if (error || !product) {
        throw new Error(`Product not found: ${item.productId}`);
      }
      
      serverTotal += Number(product.price) * item.quantity;
    }

    if (serverTotal <= 0) {
      throw new Error("Invalid total amount");
    }

    const { baseUrl } = getPayPalConfig();
    const accessToken = await getPayPalAccessToken();

    const response = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: serverTotal.toFixed(2),
            },
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("PayPal create order error:", errorText);
      throw new Error("Failed to create PayPal order");
    }

    const order = await response.json();
    return { orderId: order.id, verifiedTotal: serverTotal };
  });

export const capturePayPalOrderFn = createServerFn({ method: "POST" })
  .validator((orderId: string) => orderId)
  .handler(async ({ data: orderId }) => {
    // Check if order already captured
    const { data: existingOrder } = await supabase
      .from("orders")
      .select("id")
      .eq("paypal_order_id", orderId)
      .limit(1)
      .single();

    if (existingOrder) {
      throw new Error("Order already captured");
    }

    const { baseUrl } = getPayPalConfig();
    const accessToken = await getPayPalAccessToken();

    const response = await fetch(
      `${baseUrl}/v2/checkout/orders/${orderId}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("PayPal capture error:", errorText);
      throw new Error("Failed to capture PayPal order");
    }

    const captureData = await response.json();
    
    // Extract the capture ID
    const captureId = captureData.purchase_units?.[0]?.payments?.captures?.[0]?.id;
    const status = captureData.status; // e.g., "COMPLETED"
    
    return {
      success: status === "COMPLETED",
      captureId,
      details: captureData,
    };
  });
