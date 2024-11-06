"use client";

import { useAuth } from "@/hooks/user/useAuth";
import Link from "next/link";
import React from "react";

const NavCrumb = () => {
  const { user } = useAuth();
  return (
    <nav className="flex gap-2 items-center md:hidden">
      <Link href={"/events/discover"}>Discover events</Link>

      {user ? (
        <div className="flex gap-2">
          <p>/</p>
          <Link href={"/events/myevents"}>My events</Link>
        </div>
      ) : null}
    </nav>
  );
};

export default NavCrumb;
