"use client";

import Empty from "@/components/events/Empty";
import SkeletonEventCardDisplay from "@/components/events/EventCardSkeleton";
import Loader from "@/components/events/Loader";
import MyEventCard from "@/components/events/MyEventCard";
import Header from "@/components/ui/Header";
import { useEvents } from "@/hooks/useEvents";
import { useAuth } from "@/hooks/user/useAuth";
import { EventResponse } from "@/types/type";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const MyEventsList = () => {
  const {
    data: eventsData,
    isLoading: loading,
    error: eventErr,
    isError,
  } = useEvents();
  const { user, isLoading, error } = useAuth();
  const [filteredEvents, setFilteredEvents] = useState<EventResponse[]>([]);
  useEffect(() => {
    if (!eventsData) return;
    const filtered = user
      ? eventsData.filter((event) => event.UserId == user.userId)
      : eventsData;
    setFilteredEvents(filtered);

  }, [eventsData, user]);
  if (isLoading) return <div><Loader/></div>;
  if (error) {
    redirect("/login");
  }
  if (!user) {
    redirect("/login");
  }

  if (loading) {
    return <SkeletonEventCardDisplay />;
  }
  if (isError) {
    return <div>Error: {eventErr.message}</div>;
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
            .filter((event) => event.UserId == user.userId)
            .map((event, i) => {
              return (
                <MyEventCard
                  key={i}
                  id={event.ID}
                  name={event.Name}
                  description={event.Description}
                  startDate={event.StartDate}
                  category={event.Category}
                  startTime={event.StartTime}
                  location={event.Location}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default MyEventsList;
