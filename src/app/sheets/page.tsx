"use client";

import { v4 } from "uuid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";

const Sheets = () => {
  const router = useRouter();
  const supabase = createClient();

  const [sheets, setSheets] = useState<{ id: string }[]>([]);

  useEffect(() => {
    const fetchSheets = async () => {
      const user = await supabase.auth.getUser();
      if (user.error) {
        console.log("Auth Error", user.error);
        router.push("/login");
        return;
      }
      const { data } = await supabase
        .from("sheets")
        .select("id")
        .eq("user_id", user.data.user.id);
      if (!data) return;
      setSheets(data);
    };
    fetchSheets();
  }, []);

  const handleCreate = async () => {
    const user = await supabase.auth.getUser();
    if (user.error) {
      console.log("Auth Error", user.error);
      router.push("/login");
      return;
    }
    const sheetId = v4();
    const res = await supabase.from("sheets").insert({
      id: sheetId,
      user_id: user.data.user.id,
    });

    console.log("Res", res);

    router.push(`/sheets/${sheetId}`);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Sheets</h1>
        <button
          className="p-2 bg-gray-700 rounded-lg text-white"
          onClick={handleCreate}
        >
          + Create New
        </button>
      </div>
      <ul className="mt-4">
        {sheets.map((sheet, idx) => (
          <li key={sheet.id} className="mb-2 flex gap-2">
            <span className="text-gray-500">•</span>
            <a
              href={`/sheets/${sheet.id}`}
              className="text-blue-500 hover:underline"
            >
              {`Sheet ${idx + 1}`}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Sheets;
