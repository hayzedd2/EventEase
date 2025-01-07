"use client";

import Empty from "@/components/events/Empty";
import SkeletonEventCardDisplay from "@/components/events/EventCardSkeleton";
import EventError from "@/components/events/EventError";
import Loader from "@/components/events/Loader";
import MyEventCard from "@/components/events/MyEventCard";
import Header from "@/components/ui/Header";
import { useEvents } from "@/hooks/useEvents";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { EventResponse } from "@/types/type";
import { useMyEvents } from "@/hooks/useMyEvents";

const MyEventsList = () => {
  const { data: eventsData, isLoading: eventsLoading } = useMyEvents();
  const { user, isLoading: authLoading } = useAuth();
  // Always check auth loading first
  if (authLoading || eventsLoading) {
    return <SkeletonEventCardDisplay />;
  }

  if (!user) {
    redirect("/login");
  }
  if (!eventsData || eventsData.length == 0) {
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
      <Header text="My Events" />
      <div className="grid gap-3 pb-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {eventsData.map((event) => (
          <MyEventCard
            key={event.id}
            id={event.id}
            name={event.name}
            description={event.description}
            startDate={event.startDate}
            category={event.category}
            startTime={event.startTime}
            location={event.location}
          />
        ))}
      </div>
    </div>
  );
};

export default MyEventsList;
