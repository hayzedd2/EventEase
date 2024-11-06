"use client"

import { CreateEventForm } from "@/components/events/CreateEventForm";
import Loader from "@/components/events/Loader";
import { useAuth } from "@/hooks/user/useAuth";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  const { user, isLoading, error } = useAuth();
  if (isLoading) return <div><Loader/></div>;
  if (error) {
    redirect("/login");
  }
  if (!user) {
    redirect("/login");
  }
  return (
    <div>
      <CreateEventForm />
    </div>
  );
};

export default page;
