"use client"
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation'
import styles from "../styles/auth.module.css"
import AuthForm from "../components/forms/authForm";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

const LoginPage = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  useEffect(() => { // prefetching homepage
    router.prefetch('/')
  }, [router])

  const handleLogin = async (data) => {
    await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password
    })
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