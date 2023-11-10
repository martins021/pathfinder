"use client"
import React from "react";
import { useRouter } from 'next/navigation'
import styles from "../styles/auth.module.css"
import AuthForm from "../components/forms/authForm";

const RegisterPage = () => {
  const router = useRouter();

  const registerUser = async (data) => {
    console.log(data);

    const resp = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    if (!resp.ok) {
      throw new Error(`Error! status: ${resp.status}`);
    }

    const userInfo = await resp.json()
    console.log(userInfo);
    router.push('/login');
  }

  return(
    <div className={styles.main}>
      <AuthForm 
        submitText={"Register"}
        onSubmit={registerUser}
      />
    </div>
  )
}

export default RegisterPage;