"use client"
import styles from './styles/home.module.css'
import React from "react";
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.main} >
      <Link href="/map/new" className={styles.createMapDiv}>
        Create a new map
      </Link>
    </div>
  )
}
