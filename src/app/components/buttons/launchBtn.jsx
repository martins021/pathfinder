import styles from "../../styles/launch.module.css"

const LaunchBtn = ({ onClick }) => {
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
          stroke-linejoin="round"
        />
      </svg>
      <div className={styles.inner}>
        <h3>Launch</h3>
      </div>
    </div>
  )
};

export default LaunchBtn;