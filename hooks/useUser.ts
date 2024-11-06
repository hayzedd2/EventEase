import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getUserFromToken } from "./user/getUserFromToken";
import { User } from "@/types/type";

export const useUser = () => {
  return useQuery<User, AxiosError<Error | null>>({
    queryKey: ["user"],
    queryFn: getUserFromToken,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
