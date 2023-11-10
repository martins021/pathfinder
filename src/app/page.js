"use client"
import styles from './styles/home.module.css'
import React from "react";
import Link from 'next/link';
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session);
  console.log(status);
  return (
    <div className={styles.main} >
      <Link href="/map/new" className={styles.createMapDiv}>
        Create a new map
      </Link>
    </div>
  )
}
