"use client"
import React from "react";
import styles from "../../styles/auth.module.css"
import { useForm } from "react-hook-form"
import { usePathname } from 'next/navigation'

const AuthForm = ({ submitText, onSubmit, referrer = "register" }) => {
  const { register, handleSubmit } = useForm();
  const pathname = usePathname();

  return(
    <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
      {!pathname.includes("login") && 
      <>
        <label>
          UserName:
        </label>
        <input { ...register("username") } />
      </>
      }

      <label>
        E-mail:
      </label>
      <input { ...register("email") } />

      <label>
        Password:
      </label>
      <input { ...register("password") } />

      <input type="submit" value={submitText} />
    </form>
  )
}

export default AuthForm;
