"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const { status, data: session } = useSession();
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="flex justify-between pb-4 border-b mb-4 relative">
      <div>
        <Link href={"/"}>
          <h1 className="text-dark text-4xl font-bold tracking-tighter">
            My Journey
          </h1>
        </Link>
        <p className="text-sm">
          Explore my Journey now! <br /> You only live once!
        </p>
      </div>
      {status === "authenticated" ? (
        <>
          {isExpanded && (
            <div className="absolute z-30 right-0 top-20 bg-white p-6 shadow-lg rounded-md flex flex-col gap-2 text-right min-w-[160px]">
              <div className="font-bold">{session?.user?.name}</div>
              <div>{session?.user?.email}</div>
              <Link href={"/dashboard"} className="hover:underline" onClick={handleExpanded}>Dashboard</Link>
              <Link href={"/create-post"} className="hover:underline" onClick={handleExpanded}>Create Post</Link>
              <button className="btn" onClick={() => signOut()}>
                Sign out
              </button>
            </div>
          )}
          <div className="flex gap-2 items-center">
            <Link
              href={"/create-post"}
              className="hidden md:flex gap-2 items-center mr-6"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </span>
              <span>Create new</span>
            </Link>
            <Image
              src={session?.user?.image || ""}
              width={36}
              height={36}
              alt="Profile Image"
              className="rounded-full cursor-pointer"
              onClick={handleExpanded}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center">
          <Link className="btn" href={"/sign-in"}>
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
}
