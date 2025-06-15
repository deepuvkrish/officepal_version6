//  ./app/components/SignIn.tsx
"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <button
      onClick={() => signIn("google")}
      className="cursor-pointer px-2 py-2 signinbtn"
    >
      Sign in
    </button>
  );
}
