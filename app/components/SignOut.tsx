"use client";
import { signOut } from "next-auth/react";

export function SignOut() {
  return (
    <button
      onClick={() => signOut()}
      className="cursor-pointer border-amber-100 rounded-xl bg-green-300 px-2 py-2 text-gray-700"
    >
      Sign Out
    </button>
  );
}
