"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'
import styles from "../styles/auth.module.css"

const LoginPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const { email, password } = data;

    const resp = await fetch("api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
    
    console.log("response: ", resp);

    if (resp.ok) {
      return router.push("/maps/myMaps");
    }
  }

  return(
    <div className={styles.main}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
        <label>
          E-mail:
        </label>
        <input { ...register("email") } />
        
        <label>
          Password:
        </label>
        <input { ...register("password") } />

        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default LoginPage;