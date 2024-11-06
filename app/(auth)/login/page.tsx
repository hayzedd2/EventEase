"use client";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/user/useAuth";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const { user, isLoading } = useAuth();
  useEffect(() => {
    if (user && !isLoading) {
      redirect("/events/discover");
    }
  }, [user, isLoading]);
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default page;
