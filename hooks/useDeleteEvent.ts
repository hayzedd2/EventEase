import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteEvent } from "@/actions/deleteEvent";

export const useDeleteEvent = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => DeleteEvent(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["myevents"],
      });
      window.location.reload();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
