"use client";
import { User } from "@prisma/client";
import React, { createContext } from "react";

export const AuthContext = createContext<{
  user: User | null;
}>({
  user: null,
});

function AuthContextProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
