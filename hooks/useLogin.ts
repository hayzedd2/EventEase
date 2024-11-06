import { useMutation } from "@tanstack/react-query";
import { Login } from "@/actions/login";
import { setCookies } from "@/actions/setCookie";
import { useRouter } from "next/navigation";
import { useAuth } from "./user/useAuth";

export const useLogin = () => {
  const router = useRouter();
  const { refetch } = useAuth();
  return useMutation({
    mutationFn: Login,
    onSuccess: async (data) => {
      setCookies(data.token);
      await refetch();
      router.push("/events/discover");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
