"use client"
import styles from './styles/home.module.css'
import React from "react";
import Link from 'next/link';
import { Heading } from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.main}>
        <Heading as="h1" size="xl" className={styles.title}>
          Pathfinding Algorithm Visualizer
        </Heading>
        <Link href="/map/new" className={styles.createMapDiv}>
          Create a new map
        </Link>
      </div>
    </>
  )
}
