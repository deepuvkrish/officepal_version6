"use client";

import { useSession } from "next-auth/react";
import ProfileForm from "./ProfileForm";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session || !session.user)
    return <p>You must be logged in to view this page.</p>;

  return (
    <div className="w-[95%] mx-auto pt-24 px-4 mt-10">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <ProfileForm sessionUser={session.user} />
    </div>
  );
}
