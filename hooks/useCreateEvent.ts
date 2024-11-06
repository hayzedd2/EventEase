import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CreateEvent } from "@/actions/createEvent";

export const useCreateEvent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CreateEvent,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["events"],
      });
      router.push("/events/myevents");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
