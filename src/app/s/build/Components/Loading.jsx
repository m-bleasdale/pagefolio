import styles from '../build.module.css';

export default function Loading() {

  return(
    <div className={styles.Page}>
        <div className={styles.main}>
            <p>Loading...</p>
        </div>
        <footer className={styles.footer}>
            <img src='LogoFull.png' />
        </footer>
    </div>
  );
}