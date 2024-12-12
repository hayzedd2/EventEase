import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { EventSchema } from "@/schema";

export const useUpdateEvent = (id: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: z.infer<typeof EventSchema>) => {
      const response = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    },
    onSuccess: async (updatedEvent) => {
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
  });
};
