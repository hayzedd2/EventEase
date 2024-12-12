import { useMutation } from "@tanstack/react-query";
import { setCookies } from "@/actions/setCookie";
import { useRouter } from "next/navigation";
import { useAuth } from "./user/useAuth";
import { LoginSchema } from "@/schema";
import { z } from "zod";

export const useLogin = () => {
  const router = useRouter();
  const { refetch } = useAuth();
  return useMutation({
    mutationFn: async (values: z.infer<typeof LoginSchema>) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
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
    onSuccess: async (data) => {
      setCookies(data.token);
      router.push("/events/discover");
    },
  });
};
