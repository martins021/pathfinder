"use client"
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const CredentialsComponent = () => {
  const { data: session, status } = useSession();
  
  console.log("Credentials: ", session, status);

  const handleLogOut = () => {
    signOut()
  }
  
  return (
      status === "authenticated" ?
      <div className={`ml-auto text-customWhite flex gap-4`}>
          <p>
            Welcome, 
            <span className="italic"> {session?.user?.name}</span>
          </p>
          <p className="cursor-pointer" onClick={handleLogOut}>Log out</p>
      </div>
      :
      <div className={`ml-auto text-customWhite flex gap-4`}>
        <Link href="/login">
          <p className="cursor-pointer">Login</p>
        </Link>
        <Link href="/register">
          <p className="cursor-pointer">Register</p>
        </Link>
      </div>
  )
}

export default CredentialsComponent;