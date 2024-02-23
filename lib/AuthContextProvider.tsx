"use client";
import React, { createContext } from "react";
import { LoggedInUser } from "./types";

export const AuthContext = createContext<{
  user: LoggedInUser | null;
}>({
  user: null,
});

function AuthContextProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: LoggedInUser | null;
}) {
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
