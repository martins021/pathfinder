"use client"
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation'
import styles from "../styles/auth.module.css"
import AuthForm from "../components/forms/authForm";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Heading } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

const LoginPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const toast = useToast();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  useEffect(() => { // prefetching homepage
    router.prefetch('/')
  }, [router])

  const handleLogin = async (data) => {
    const resp = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password
    })

    if(resp.error){
      toast({
        description: "Failed to log in",
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
    }
  }

  return(
    <div className={styles.main}>
      <div>
        <Heading as="h1" size="2xl" mb={8}>Log in</Heading>
        <Heading as="h1" size="lg">to publish maps,</Heading>
        <Heading as="h1" size="md">like published maps,</Heading>
        <Heading as="h1" size="sm">add comments</Heading>
        <Heading as="h1" size="xs">and more</Heading>
      </div>
      <AuthForm 
        submitText={"Log in"}
        onSubmit={handleLogin}
      />
    </div>
  )
}

export default LoginPage;