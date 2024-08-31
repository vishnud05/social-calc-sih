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

    router.push(`/sheets/${sheetId}`);
  };

  return (
    <div className="p-4">
      <div className="flex justify-center w-full ">
        <div className="flex justify-center flex-col items-center gap-4">
          <h1 className="text-3xl font-bold">
            SocialCalc - Modern Way to Spreadsheet
          </h1>
          <p>New Way To Visualise Your Data</p>

          <button
            className="p-2 bg-gray-700 rounded-lg text-white"
            onClick={handleCreate}
          >
            + Create New
          </button>
        </div>
      </div>
      <ul className="mt-4">
        {sheets.map((sheet, idx) => (
          <div key={idx} className="py-2 border-b-2 border-gray-950">
            <li key={sheet.id} className="mb-2 flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>

              <a
                href={`/sheets/${sheet.id}`}
                className="text-blue-100 hover:underline font-bold text-lg"
              >
                {`Workbook ${idx + 1}`}
              </a>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};
export default Sheets;
