import { AuthContext } from "@/context/AuthContext";
import { useUser } from "@/hooks/useUser";


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data:user, isLoading, error, refetch } = useUser();
  return (
    <AuthContext.Provider value={{ user, isLoading, error, refetch }}>
      {children}
    </AuthContext.Provider>
  );
};
