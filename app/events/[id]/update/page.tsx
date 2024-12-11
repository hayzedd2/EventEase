"use client";

import { useAuth } from "@/hooks/user/useAuth";
import { useSingleEvent } from "@/hooks/useSingleEvent";
import { redirect } from "next/navigation";
import React from "react";
import { UpdateEventForm } from "@/components/events/UpdateEventForm";
import Loader from "@/components/events/Loader";
import Empty from "@/components/events/Empty";

export default function EditEventPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = React.use(params);
  const { user, isLoading: authLoading, error: authError } = useAuth();
  const {
    data: eventData,
    error: eventError,
    isLoading: eventLoading,
  } = useSingleEvent(id);
  if (authLoading) {
    return <Loader />;
  }
  if (authError || !user) {
    redirect("/login");
  }
  if (eventLoading) {
    return <Loader />;
  }
  if (eventError) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-red-500">Error: {eventError.message}</div>
      </div>
    );
  }

  if (!eventData) {
    return (
      <Empty
        text="You haven't created any event at this time"
        buttonHref="/events/create"
        buttonText="Create an event"
      />
    );
  }

  return (
    <div>
      <UpdateEventForm eventData={eventData} />
    </div>
  );
}
