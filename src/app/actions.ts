"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const logout = async () => {
  const supabase = createClient();
  ("use server");
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
};
