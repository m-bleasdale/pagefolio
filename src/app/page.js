'use client'; //Dev only disable later

import { useUser } from '@auth0/nextjs-auth0';
import styles from "@/app/styles/home.module.css";

export default function Home() {
  const { user, error, isLoading } = useUser();

  return(
    <div className={styles.Home}>
      <div className={styles.main}>
        <h1>PageFolio Testing Enviroment</h1>
        <p>The following pages are sample pages.</p>
        <div className={styles.SampleLink}>
          <a href="/shell" style={{backgroundColor: '#D52B1E', color: '#ffffff'}}>
            <p>Shell Oil Co</p>
          </a>
        </div>
        <div className={styles.SampleLink}>
          <a href="/coffeeplanet" style={{backgroundColor: '#000000', color: '#ffffff'}}>
            <p>Coffee Planet</p>
          </a>
        </div>
        {user && <p>{user.nickname}</p>}
        <a href="/api/auth/login">Login</a>
        <a href="/api/auth/logout">Logout</a>
      </div>
    </div>
  );
}