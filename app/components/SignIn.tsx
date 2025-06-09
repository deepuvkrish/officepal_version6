"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <button
      onClick={() => signIn("google")}
      className="cursor-pointer border-amber-100 rounded-xl bg-amber-300 px-2 py-2 text-gray-700"
    >
      Sign in
    </button>
  );
}
