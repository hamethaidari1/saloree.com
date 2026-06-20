import { supabase } from "@/integrations/supabase/client";

/**
 * Storage abstraction. Today: Lovable Cloud Storage.
 * Tomorrow: swap implementation for Cloudflare R2 without touching callers.
 */
export interface StorageAdapter {
  upload(file: File, opts: { userId: string; folder: string; bucket?: string }): Promise<string>;
}

const BUCKET = "saloree-media";

const cloudAdapter: StorageAdapter = {
  async upload(file, { userId, folder, bucket = BUCKET }) {
    const ext = file.name.split(".").pop() || "bin";
    const path = `${userId}/${folder}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) throw error;
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  },
};

export const storage: StorageAdapter = cloudAdapter;
