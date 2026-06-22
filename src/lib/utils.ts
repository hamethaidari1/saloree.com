import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Checks whether the Supabase error is a "table/schema not found" error */
export function isSchemaMissingError(error: any): boolean {
  const msg = error?.message ?? "";
  return (
    msg.includes("schema cache") ||
    msg.includes("relation") ||
    msg.includes("does not exist") ||
    msg.includes("not found")
  );
}
