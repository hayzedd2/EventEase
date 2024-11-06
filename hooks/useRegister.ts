import { useMutation } from "@tanstack/react-query";
import { Register } from "@/actions/register";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: Register,
    onSuccess: (data) => {
      router.push("/login");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
