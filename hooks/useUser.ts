import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { User } from "@/types/type";

export const useUser = () => {
  return useQuery<User, AxiosError<Error | null>>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/auth/user");
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      const data =  await res.json();
      return data.user;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
