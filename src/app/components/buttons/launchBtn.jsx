import styles from "../../styles/launch.module.css"

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
        {searching ? <h3>Searching...</h3> : <h3>Launch</h3>}
      </div>
    </div>
  )
};

export default LaunchBtn;