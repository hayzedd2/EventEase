"use client";

import Empty from "@/components/events/Empty";
import EventCard from "@/components/events/EventCard";
import SkeletonEventCardDisplay from "@/components/events/EventCardSkeleton";
import Header from "@/components/ui/Header";
import { useAuth } from "@/hooks/useAuth";
import { useEvents } from "@/hooks/useEvents";
import { EventResponse } from "@/types/type";
import { useEffect, useState } from "react";

const EventsList = () => {
  const { data: eventsData, isLoading, error, isError } = useEvents();
  const [filteredEvents, setFilteredEvents] = useState<EventResponse[]>([]);
  const { user } = useAuth();
  useEffect(() => {
    if (!eventsData) return;

    const filtered = user
      ? eventsData.filter((event) => event.userId !== user.userId)
      : eventsData;
    setFilteredEvents(filtered);
  }, [eventsData, user]);
  if (isLoading) {
    return <SkeletonEventCardDisplay />;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Empty
        text="There are currently no event available at this time"
        buttonHref="/events/create"
        buttonText="Create an event"
      />
    );
  }
  return (
    <div className="mt-4">
      <Header text="Upcoming Events" />
      {eventsData && (
        <div className="grid gap-3 pb-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event, i) => {
            return (
              <EventCard
                key={i}
                id={event.id}
                name={event.name}
                description={event.description}
                startDate={event.startDate}
                startTime={event.startTime}
                category={event.category}
                location={event.location}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventsList;
