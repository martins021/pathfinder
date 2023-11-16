"use client"
import React from "react";
import { useRouter } from 'next/navigation'
import styles from "../styles/auth.module.css"
import AuthForm from "../components/forms/authForm";

const RegisterPage = () => {
  const router = useRouter();

  useEffect(() => { // prefetching login page
    router.prefetch('/login')
  }, [router])

  const registerUser = async (data) => {

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

    await resp.json()
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