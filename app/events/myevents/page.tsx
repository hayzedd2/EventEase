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
import React from "react";

const MyEventsList = () => {
  const { data: eventsData, isLoading: loading, error: eventErr } = useEvents();
  const { user, isLoading, error } = useAuth();
  const filteredEvents = React.useMemo(() => {
    return user
      ? eventsData?.filter((event) => event.userId === user.userId)
      : eventsData;
  }, [eventsData, user]);
  if (error || !user) {
    redirect("/login");
  }
  if(isLoading){
    return <Loader/>
  }
  if (loading) {
    return <SkeletonEventCardDisplay />;
  }
  if (eventErr) {
    return <EventError text={eventErr.message} />;
  }
  if (!filteredEvents || filteredEvents.length === 0) {
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
      {filteredEvents && (
        <div className="grid gap-3 pb-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents
            .filter((event) => event.userId == user.userId)
            .map((event, i) => {
              return (
                <MyEventCard
                  key={i}
                  id={event.id}
                  name={event.name}
                  description={event.description}
                  startDate={event.startDate}
                  category={event.category}
                  startTime={event.startTime}
                  location={event.location}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default MyEventsList;
