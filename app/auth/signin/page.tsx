// ./app/auth/signin/page.tsx
"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function SignIn() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <button
        onClick={() => signIn("google", { callbackUrl: redirectUrl })} // or "google"
        className="bg-black text-white px-4 py-2 rounded cursor-pointer"
      >
        Sign in with Google
      </button>
    </div>
  );
}
