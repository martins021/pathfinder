"use client"
import React from "react";
import styles from "../../styles/auth.module.css"
import { useForm } from "react-hook-form"
import { usePathname } from 'next/navigation'
import { Input, Box } from '@chakra-ui/react'


const AuthForm = ({ submitText, onSubmit, referrer = "register" }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const pathname = usePathname();

  return(
    <Box className={styles.authForm} borderColor={"gray"} borderWidth='1px' borderRadius='lg' p={8}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
        {!pathname.includes("login") && 
        <>
          <label htmlFor="username">
            Username:
          </label>
          <Input id="username" { ...register("username", { required: true, maxLength: 255 }) } />
          { errors.username?.type === 'required' && <p className="text-customRed -mt-3">Username is required</p> }
          { errors.username?.type === 'maxLength' &&  <p className="text-customRed -mt-3">Username is too long</p> }
        </>
        }

        <label htmlFor="email">
          E-mail:
        </label>
        <Input id="email" type="email" { ...register("email", { required: true, maxLength: 255 }) } />
        { errors.email?.type === 'required' && <p className="text-customRed -mt-3">Email is required</p> }
        { errors.email?.type === 'maxLength' &&  <p className="text-customRed -mt-3">Email is too long</p> }

        <label htmlFor="password">
          Password:
        </label>
        <Input id="password" type="password" { ...register("password", { required: true }) } />
        { errors.password?.type === 'required' && <p className="text-customRed -mt-3">Password is required</p> }

        <Input type="submit" value={submitText} style={{ marginTop: 20 }} className={styles.submitBtn} />
      </form>
    </Box>
  )
}

export default AuthForm;
