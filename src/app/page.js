import Map from '@/components/map'
import styles from './styles/main.module.css'

export default function Home() {
    return (
        <main className="mx-auto max-w-[1920px] min-h-screen px-4">
            <div className={styles.mainGrid} >
                <div className={styles.actionsTile}>Actions</div>
                <div className={styles.mapTile}>
                    <Map />
                </div>
                <div className={styles.controlsTile}>Controls</div>
                <div className={styles.algorithmsTile}>Algorithms</div>
            </div>
        </main>
    )
}
