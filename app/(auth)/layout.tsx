"use client";
import Loader from "@/components/events/Loader";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import React from "react";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <Loader />;
  }
  if (user) {
    redirect("/events/discover");
  }
  return (
    <section className="min-h-[90vh] md:min-h-screen w-full flex items-center justify-center">
      {children}
    </section>
  );
};

export default AuthLayout;
