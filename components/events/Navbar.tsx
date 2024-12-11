"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import LogOutButton from "../auth/LogOutButton";
import { useUser } from "@/hooks/useUser";

const Navbar = () => {
  const { data:user, isLoading } = useUser();
  return (
    <nav className="w-full items-center flex justify-between py-4">
      <div className="logo">
        <h1 className="text-[1.5rem] font-[500]">EventEase</h1>
      </div>
      <div className="links flex gap-6 items-center">
        <Link href={"/events/discover"} className="hidden md:block">
          Discover events
        </Link>
        {user ? (
          <Link href={"/events/myevents"} className="hidden md:block">
            My events
          </Link>
        ) : null}
        {!isLoading ? (
          <div>
            {user ? (
              <div className="flex gap-3 items-center">
                <Link href={"/events/create"}>
                  <Button>Create event</Button>
                </Link>
              
                <LogOutButton id={user.id} />
              </div>
            ) : (
              <Link href={"/login"}>
                <Button>Login</Button>
              </Link>
            )}
          </div>
        ) : (
          <svg
            className="h-4 w-4 text-black spinner-fast"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth={"4"}
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
