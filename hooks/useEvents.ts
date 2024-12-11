import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EventResponse } from "@/types/type";
export const useEvents = () => {
  return useQuery<EventResponse[], AxiosError<Error | null>>({
    queryKey: ["events"],
    queryFn: async ()=>{
      const res = await fetch('/api/events')
      if (!res.ok){
        const error = await res.json()
        throw new Error(error.message)
      }
      return res.json()
    },
  });
};
