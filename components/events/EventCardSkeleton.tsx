import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const EventCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-lg  shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <Skeleton className="h-48 w-full rounded-tr-lg rounded-tl-lg bg-gray-200" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-4 w-3/4 bg-gray-200" />
        <Skeleton className="h-4 w-full bg-gray-200" />
        <div className="space-y-2">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="h-4 w-3/4 bg-gray-200" />
          ))}
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-9 w-32 bg-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default function SkeletonEventCardDisplay() {
  return (
    <div className="h-max py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
