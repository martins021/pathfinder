"use client"
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import styles from "../styles/auth.module.css"
import AuthForm from "../components/forms/authForm";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = async (data) => {
    const h = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password
    })

    console.log("POP: ", h);

    router.push("/");
  }

  return(
    <div className={styles.main}>
      <AuthForm 
        submitText={"Log in"}
        onSubmit={handleLogin}
      />
    </div>
  )
}

export default LoginPage;