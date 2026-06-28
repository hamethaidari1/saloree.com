export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string;
          icon: string | null;
          id: string;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string;
          icon?: string | null;
          id?: string;
          name: string;
          slug: string;
        };
        Update: {
          created_at?: string;
          icon?: string | null;
          id?: string;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          created_at: string;
          id: string;
          order_id: string;
          product_id: string;
          price: number | null;
          quantity: number;
          store_id: string | null;
          title: string | null;
          total: number | null;
          unit_price: number;
        };
        Insert: {
          created_at?: string;
          id?: string;
          order_id: string;
          product_id: string;
          price?: number | null;
          quantity: number;
          store_id?: string | null;
          title?: string | null;
          total?: number | null;
          unit_price: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          order_id?: string;
          product_id?: string;
          price?: number | null;
          quantity?: number;
          store_id?: string | null;
          title?: string | null;
          total?: number | null;
          unit_price?: number;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      orders: {
        Row: {
          address: string | null;
          city: string | null;
          created_at: string;
          customer_id: string;
          country: string | null;
          email: string | null;
          full_name: string | null;
          id: string;
          notes: string | null;
          phone: string | null;
          shipping_address: Json;
          status: string;
          store_id: string;
          subtotal: number | null;
          total: number | null;
          total_amount: number;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          created_at?: string;
          customer_id: string;
          country?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          notes?: string | null;
          phone?: string | null;
          shipping_address: Json;
          status?: string;
          store_id: string;
          subtotal?: number | null;
          total?: number | null;
          total_amount: number;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          created_at?: string;
          customer_id?: string;
          country?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          notes?: string | null;
          phone?: string | null;
          shipping_address?: Json;
          status?: string;
          store_id?: string;
          subtotal?: number | null;
          total?: number | null;
          total_amount?: number;
        };
        Relationships: [
          {
            foreignKeyName: "orders_customer_profile_fk";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "orders_store_id_fkey";
            columns: ["store_id"];
            isOneToOne: false;
            referencedRelation: "stores";
            referencedColumns: ["id"];
          },
        ];
      };
      product_images: {
        Row: {
          created_at: string;
          id: string;
          image_url: string;
          product_id: string;
          position: number | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          image_url: string;
          product_id: string;
          position?: number | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          image_url?: string;
          product_id?: string;
          position?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          category_id: string | null;
          created_at: string;
          description: string | null;
          featured_image: string | null;
          id: string;
          price: number;
          search_tsv: unknown;
          stock: number;
          store_id: string;
          title: string;
          slug: string | null;
          status: string | null;
        };
        Insert: {
          category_id?: string | null;
          created_at?: string;
          description?: string | null;
          featured_image?: string | null;
          id?: string;
          price: number;
          search_tsv?: unknown;
          stock?: number;
          store_id: string;
          title: string;
          slug?: string | null;
          status?: string | null;
        };
        Update: {
          category_id?: string | null;
          created_at?: string;
          description?: string | null;
          featured_image?: string | null;
          id?: string;
          price?: number;
          search_tsv?: unknown;
          stock?: number;
          store_id?: string;
          title?: string;
          slug?: string | null;
          status?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_store_id_fkey";
            columns: ["store_id"];
            isOneToOne: false;
            referencedRelation: "stores";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          email: string | null;
          full_name: string | null;
          id: string;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          full_name?: string | null;
          id: string;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          full_name?: string | null;
          id?: string;
        };
        Relationships: [];
      };
      stores: {
        Row: {
          banner_url: string | null;
          category: string | null;
          created_at: string;
          description: string | null;
          id: string;
          location: string | null;
          logo_url: string | null;
          name: string;
          owner_id: string;
          slug: string;
          status: string;
          updated_at: string | null;
        };
        Insert: {
          banner_url?: string | null;
          category?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          location?: string | null;
          logo_url?: string | null;
          name: string;
          owner_id: string;
          slug: string;
          status?: string;
          updated_at?: string | null;
        };
        Update: {
          banner_url?: string | null;
          category?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          location?: string | null;
          logo_url?: string | null;
          name?: string;
          owner_id?: string;
          slug?: string;
          status?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "stores_owner_profile_fk";
            columns: ["owner_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      user_roles: {
        Row: {
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_roles_user_profile_fk";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      site_settings: {
        Row: {
          id: string;
          hero_title: string | null;
          hero_subtitle: string | null;
          hero_button_text: string | null;
          hero_button_link: string | null;
          logo_url: string | null;
          primary_color: string | null;
          button_color: string | null;
          footer_text: string | null;
          footer_description: string | null;
          social_links: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          hero_title?: string | null;
          hero_subtitle?: string | null;
          hero_button_text?: string | null;
          hero_button_link?: string | null;
          logo_url?: string | null;
          primary_color?: string | null;
          button_color?: string | null;
          footer_text?: string | null;
          footer_description?: string | null;
          social_links?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          hero_title?: string | null;
          hero_subtitle?: string | null;
          hero_button_text?: string | null;
          hero_button_link?: string | null;
          logo_url?: string | null;
          primary_color?: string | null;
          button_color?: string | null;
          footer_text?: string | null;
          footer_description?: string | null;
          social_links?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      hero_slides: {
        Row: {
          id: string;
          image_url: string;
          alt_text: string;
          display_order: number;
          is_enabled: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          image_url: string;
          alt_text: string;
          display_order?: number;
          is_enabled?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          image_url?: string;
          alt_text?: string;
          display_order?: number;
          is_enabled?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      homepage_sections: {
        Row: {
          id: string;
          show_categories: boolean;
          show_new_arrivals: boolean;
          show_featured: boolean;
          categories_title: string;
          new_arrivals_title: string;
          featured_title: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          show_categories?: boolean;
          show_new_arrivals?: boolean;
          show_featured?: boolean;
          categories_title?: string;
          new_arrivals_title?: string;
          featured_title?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          show_categories?: boolean;
          show_new_arrivals?: boolean;
          show_featured?: boolean;
          categories_title?: string;
          new_arrivals_title?: string;
          featured_title?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      promo_banners: {
        Row: {
          id: string;
          image_url: string;
          banner_text: string;
          button_link: string;
          button_text: string;
          display_order: number;
          is_enabled: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          image_url: string;
          banner_text: string;
          button_link: string;
          button_text?: string;
          display_order?: number;
          is_enabled?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          image_url?: string;
          banner_text?: string;
          button_link?: string;
          button_text?: string;
          display_order?: number;
          is_enabled?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      footer_links: {
        Row: {
          id: string;
          label: string;
          url: string;
          category: string;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          label: string;
          url: string;
          category?: string;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          label?: string;
          url?: string;
          category?: string;
          display_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
      has_any_role: {
        Args: {
          _roles: Database["public"]["Enums"]["app_role"][];
          _user_id: string;
        };
        Returns: boolean;
      };
      is_content_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      app_role: "admin" | "super_admin" | "content_admin" | "seller" | "customer";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "super_admin", "content_admin", "seller", "customer"],
    },
  },
} as const;
