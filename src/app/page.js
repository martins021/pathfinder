"use client"
import Map from '@/app/components/map'
import Controls from '@/app/components/controls'
import Actions from './components/actions'
import styles from './styles/main.module.css'
import { MapProvider } from '@/app/context/mapContext'

export default function Home() {
  return (
    <MapProvider>
      <main className="mx-auto max-w-[1920px] min-h-screen px-4">
        <div className={styles.mainGrid} >
          <div className={styles.actionsTile}>
            <Actions />
          </div>
          <div className={styles.mapTile}>
            <Map />
          </div>
          <div className={styles.controlsTile}>
            <Controls />
          </div>
          <div className={styles.algorithmsTile}>Algorithms</div>
        </div>
      </main>
    </MapProvider>
  )
}
