import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EventResponse } from "@/types/type";
import { fetchEventById } from "@/actions/fetchEventById";
export const useSingleEvent = (id : number) => {
  return useQuery<EventResponse, AxiosError<Error | null>>({
    queryKey: ["event", id],
    queryFn: ()=> fetchEventById(id),
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true 
  });
};
