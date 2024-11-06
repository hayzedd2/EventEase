"use client";
import { useEffect } from "react";
import { useRouter, redirect } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    // Add a condition to prevent infinite redirects
    const currentPath = window.location.pathname;
    if (currentPath !== "/events/discover") {
      router.push("/events/discover");
    }
  }, []); // Remove router from dependencies

  return null;
};

export default Page;