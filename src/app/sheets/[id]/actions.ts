"use server";

import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export async function uploadSpreadsheet(sheetData: JSON, id: string) {
  const supabase = createClient();
  const userRes = await supabase.auth.getUser();

  if (userRes.error) {
    console.log("Auth Error", userRes.error);
    redirect("/login");
  }

  const storageRes = await supabase.storage
    .from("sheets")
    .upload(`/${userRes.data.user.id}/${id}.json`, JSON.stringify(sheetData), {
      cacheControl: "3600",
      upsert: true,
    });

  if (storageRes.error) {
    console.log("Storage Error", storageRes.error);
    return;
  }
}

export async function readSpreadsheet(id: string) {
  const supabase = createClient();
  const userRes = await supabase.auth.getUser();

  if (userRes.error) {
    console.log("Auth Error", userRes.error);
    return;
  }

  const storageRes = supabase.storage
    .from("sheets")
    .getPublicUrl(`/${userRes.data.user.id}/${id}.json`);

  if (!storageRes.data.publicUrl) {
    console.log("Not Found");
    return;
  }

  const res = await fetch(storageRes.data.publicUrl);
  const json = await res.json();
  if (json.error) {
    return [];
  }
  return json;
}
