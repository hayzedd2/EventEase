import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UpdateEvent } from "@/actions/updateEvent";
import { z } from "zod";
import { EventSchema } from "@/schema";

interface updateProps {
  values: z.infer<typeof EventSchema>;
  id: number;
}
export const useUpdateEvent = (id: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ values, id }: updateProps) => UpdateEvent(values, id),

    onSuccess: async (updatedEvent) => {
      console.log(updatedEvent);
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["event", id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["events"],
        }),
      ]);
      router.push("/events/myevents");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
