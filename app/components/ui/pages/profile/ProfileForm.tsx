// ./app/components/ProfileForm.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileStack, User, UserPen } from "lucide-react";

type Props = {
  sessionUser: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export default function ProfileForm({ sessionUser }: Props) {
  const [name, setName] = useState(sessionUser.name || "");
  const [email, setEmail] = useState(sessionUser.email || "");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");

  const handleSave = () => {
    // TODO: Save to API or Zustand store
    console.log({ name, email, phone, linkedin, portfolio });
    alert("Saved! (stub)");
  };

  return (
    <div className="flex flex-col">
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <div className="flex items-center mb-6">
          <Image
            src={sessionUser.image || "/default-avatar.png"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover mr-4 border"
            height={100}
            width={150}
          />
          <div>
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-gray-500">{email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone"
            className="input input-bordered w-full"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="text"
            placeholder="LinkedIn URL"
            className="input input-bordered w-full"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />

          <input
            type="text"
            placeholder="Portfolio URL"
            className="input input-bordered w-full"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
          />
        </div>

        <button
          className="mt-6 bg-black text-white py-2 px-4 rounded hover:opacity-90"
          onClick={handleSave}
        >
          Save Profile
        </button>
      </div>
      <div className="container bootstrap snippets bootdey mb-10">
        <div className="row flex justify-between">
          <div className="profile-nav w-[23%]">
            <div className="panel">
              <div className="user-heading round">
                <Link href="#">
                  <Image
                    src={sessionUser.image || "/default-avatar.png"}
                    alt="Profile"
                    height={100}
                    width={150}
                  />
                </Link>
                <h1>{name}</h1>
                <p>{email}</p>
              </div>

              <ul className="nav nav-pills nav-stacked">
                <li className="active">
                  <Link href="#" className="flex h-[50px] items-center px-2">
                    <User /> Profile
                  </Link>
                </li>
                <li>
                  <Link href="#" className="flex h-[50px] items-center px-2">
                    <FileStack /> Saved Documents
                    <span className="label label-warning pull-right r-activity">
                      9
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="flex h-[50px] items-center px-2">
                    <UserPen /> Edit profile
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="profile-info w-[73%] bg-white">
            <div className="panel">
              <div className="bio-graph-heading">
                Aliquam ac magna metus. Nam sed arcu non tellus fringilla
                fringilla ut vel ispum. Aliquam ac magna metus.
              </div>

              <div className="panel ">
                <div className="panel-body bio-graph-info py-5 px-5">
                  <h1>Bio Graph</h1>
                  <div className="row">
                    <div className="bio-row">
                      <p>
                        <span>Name </span>: {name}
                      </p>
                    </div>
                    <div className="bio-row">
                      <p>
                        <span>Last Name </span>: Smith
                      </p>
                    </div>
                    <div className="bio-row">
                      <p>
                        <span>Country </span>: Australia
                      </p>
                    </div>
                    <div className="bio-row">
                      <p>
                        <span>Birthday</span>: 13 July 1983
                      </p>
                    </div>
                    <div className="bio-row">
                      <p>
                        <span>Occupation </span>: UI Designer
                      </p>
                    </div>
                    <div className="bio-row">
                      <p>
                        <span>Email </span>: jsmith@flatlab.com
                      </p>
                    </div>
                    <div className="bio-row">
                      <p>
                        <span>Mobile </span>: (12) 03 4567890
                      </p>
                    </div>
                    <div className="bio-row">
                      <p>
                        <span>Phone </span>: 88 (02) 123456
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
