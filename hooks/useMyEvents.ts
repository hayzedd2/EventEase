import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EventResponse } from "@/types/type";
export const useMyEvents = () => {
  return useQuery<EventResponse[], AxiosError<Error | null>>({
    queryKey: ["myevents"],
    queryFn: async ()=>{
      const res = await fetch('/api/events/me')
      if (!res.ok){
        const error = await res.json()
        throw new Error(error.message)
      }
      const data = await res.json()
      return data
    },

  });
  
};
