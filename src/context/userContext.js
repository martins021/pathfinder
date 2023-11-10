"use client"
import { SessionProvider } from "next-auth/react";

export const UserProvider = ({ children }) => {
  return (
    <SessionProvider>
      { children }
    </SessionProvider>
  );
};

export default UserProvider;
