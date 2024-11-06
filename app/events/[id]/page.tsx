"use client";

import SkeletonEventCardDisplay from "@/components/events/EventCardSkeleton";
import SingleEventCard from "@/components/events/SingleEventCard";
import { Button } from "@/components/ui/button";
import { useSingleEvent } from "@/hooks/useSingleEvent";
import { addToGoogleCalendar } from "@/utils/addToGoogleCalendar";
import * as React from "react";
const page = ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = React.use(params);
  const { data: eventData, error, isLoading, isError } = useSingleEvent(id);
  if (isLoading) {
    return <SkeletonEventCardDisplay />;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (!eventData) {
    return <div>No events found.</div>;
  }
  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      {eventData && (
        <>
          <SingleEventCard
            id={id}
            name={eventData.Name}
            description={eventData.Description}
            startDate={eventData.StartDate}
            startTime={eventData.StartTime}
            category={eventData.Category}
            location={eventData.Location}
          />
          {/* <Button onClick={() => addToGoogleCalendar(eventData)}>
            Add to google calendar
          </Button> */}
        </>
      )}
    </div>
  );
};

export default page;
