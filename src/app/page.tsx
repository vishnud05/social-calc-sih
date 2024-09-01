"use client";
import { createClient } from "@/lib/supabase-client";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "./actions";

export default function Home() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const fetchUser = async () => {
      const user = await supabase.auth.getUser();
      if (user.error) {
        console.log("Auth Error", user.error);
        return;
      }
      setUser(user.data.user);
    };
    fetchUser();
  }, []);
  return (
    <main className="grid place-items-center h-screen">
      <div className="flex justify-center gap-4">
        {user ? (
          <>
            <button
              onClick={async () => {
                await logout();
              }}
              className="p-2 bg-red-700 rounded-lg text-white text-sm"
            >
              Logout
            </button>
            <Link
              href={"/sheets"}
              className="p-2 bg-blue-700 rounded-lg text-white"
            >
              Sheets
            </Link>
          </>
        ) : (
          <Link
            href="/login"
            className="p-2 bg-blue-700 rounded-lg text-white text-sm"
          >
            Login/SignUp
          </Link>
        )}
      </div>
    </main>
  );
}
