import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EventResponse } from "@/types/type";
export const useSingleEvent = (id : number) => {
  return useQuery<EventResponse, AxiosError<Error | null>>({
    queryKey: ["event", id],
    queryFn: async ()=>{
      const res = await fetch(`/api/events${id}`)
      if (!res.ok){
        const error = await res.json()
        throw new Error(error.message)
      }
      return res.json()
    },
    // staleTime: 0,
    // refetchOnMount: 'always',
    // refetchOnWindowFocus: true 
  });
};
