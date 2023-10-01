import Map from '@/components/map'
import Controls from '@/components/controls'
import styles from './styles/main.module.css'
import { MapProvider } from '@/context/mapContext'

export default function Home() {
  return (
    <MapProvider>
      <main className="mx-auto max-w-[1920px] min-h-screen px-4">
        <div className={styles.mainGrid} >
          <div className={styles.actionsTile}>Actions (save)</div>
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
