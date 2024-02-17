"use client";
import { createContext, useEffect, useState } from "react";
import { User } from "@prisma/client";

export const AuthContext = createContext<{
  isLoading: boolean;
  user: User | null;
  revalidateUser: () => void;
}>({
  isLoading: true,
  user: null,
  revalidateUser: () => {},
});

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<null | User>(null);
  const [isLoading, setIsLoading] = useState(true);

  function fetchUser() {
    fetch("/api/profile")
      .then(async (res) => {
        if (res.ok) {
          setUser(await res.json());
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  useEffect(() => {
    fetchUser();
  }, []);

  function revalidateUser() {
    setIsLoading(true);
    fetchUser();
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, revalidateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
