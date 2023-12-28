"use client"
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation'
import styles from "../styles/auth.module.css"
import AuthForm from "../components/forms/authForm";
import { Heading } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

const RegisterPage = () => {
  const router = useRouter();
  const toast = useToast();

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

    const respText = await resp.text();
    if(resp.status !== 200){
      toast({
        title: "Failed to register",
        description: respText,
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
    } else {
      router.push('/login');
    }
  }

  return(
    <div className={styles.main}>
      <div>
        <Heading as="h1" size="2xl" mb={8}>Register</Heading>
        <Heading as="h1" size="lg">to publish maps,</Heading>
        <Heading as="h1" size="md">like published maps,</Heading>
        <Heading as="h1" size="sm">add comments</Heading>
        <Heading as="h1" size="xs">and more</Heading>
      </div>
      <AuthForm 
        submitText={"Register"}
        onSubmit={registerUser}
      />
    </div>
  )
}

export default RegisterPage;