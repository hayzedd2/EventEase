import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EventResponse } from "@/types/type";
import { fetchEvents } from "@/actions/fetchEvents";
export const useEvents = () => {
  return useQuery<EventResponse[], AxiosError<Error | null>>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
};
