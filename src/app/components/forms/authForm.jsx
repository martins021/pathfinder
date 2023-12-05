"use client"
import React from "react";
import styles from "../../styles/auth.module.css"
import { useForm } from "react-hook-form"
import { usePathname } from 'next/navigation'
import { Input, Box } from '@chakra-ui/react'


const AuthForm = ({ submitText, onSubmit, referrer = "register" }) => {
  const { register, handleSubmit } = useForm();
  const pathname = usePathname();

  return(
    <Box className={styles.authForm} borderColor={"gray"} borderWidth='1px' borderRadius='lg' p={8}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
        {!pathname.includes("login") && 
        <>
          <label>
            Username:
          </label>
          <Input { ...register("username") } />
        </>
        }

        <label>
          E-mail:
        </label>
        <Input type="email" { ...register("email") } />

        <label>
          Password:
        </label>
        <Input type="password" { ...register("password") } />

        <Input type="submit" value={submitText} style={{ marginTop: 20 }} className={styles.submitBtn} />
      </form>
    </Box>
  )
}

export default AuthForm;
