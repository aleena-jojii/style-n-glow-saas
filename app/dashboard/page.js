// app/dashboard/page.js
export const dynamic = "force-dynamic"; //  disables static prerendering

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the logged-in user from Supabase
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
      } else {
        setUser(data.user);
      }
    };

    getUser();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {user ? (
        <div className="p-4 bg-white rounded shadow">
          <p className="text-gray-700">Welcome, {user.email} </p>
        </div>
      ) : (
        <p className="text-gray-500">No user logged in.</p>
      )}

      <button
        onClick={async () => {
          await supabase.auth.signOut();
          setUser(null);
        }}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Sign out
      </button>
    </div>
  );
}
