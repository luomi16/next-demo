"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { status } = useSession();
  return (
    <div className="flex justify-between pb-4 border-b mb-4">
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
        <div><button className="btn" onClick={() => signOut()}>Sign out</button></div>
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
