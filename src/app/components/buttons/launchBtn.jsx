import styles from "../../styles/launch.module.css"
import { Spinner } from '@chakra-ui/react'

const LaunchBtn = ({ searching, onClick }) => {
  return(
    <div 
      className={`${styles.card} ${styles.launchBtn}`}
      onClick={onClick}
    >
      <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
        <rect
          className={styles.line}
          height="100%"
          width="100%"
        />
      </svg>
      <div className={styles.inner}>
        {searching ? <Spinner /> : <h3>Launch</h3>}
      </div>
    </div>
  )
};

export default LaunchBtn;