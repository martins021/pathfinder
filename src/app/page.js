"use client"
import Map from '@/app/components/map'
import Controls from '@/app/components/controls'
import Actions from './components/actions'
import styles from './styles/main.module.css'
import { MapProvider } from '@/app/context/mapContext'
import React, { useContext, useEffect, useState } from "react";


export default function Home() {
  const [tool, setTool] = useState('start')

  return (
    <MapProvider>
      <main className="mx-auto max-w-[1920px] min-h-screen px-4">
        <div className={styles.mainGrid} >
          <div className={styles.actionsTile}>
            <Actions />
          </div>
          <div className={styles.mapTile}>
            <Map tool={tool} />
          </div>
          <div className={styles.controlsTile}>
            <Controls tool={tool} setTool={setTool} />
          </div>
          <div className={styles.algorithmsTile}>Algorithms</div>
        </div>
      </main>
    </MapProvider>
  )
}
