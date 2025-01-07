import { createContext } from "react";
import { User } from "@/types/type";

interface AuthContextType {
  user: User | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<any>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
