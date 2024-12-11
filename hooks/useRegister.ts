import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { RegisterSchema } from "@/schema";
import { z } from "zod";

export const useRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (values: z.infer<typeof RegisterSchema>) => {
      const response = await fetch("/api/auth/register", {
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
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
