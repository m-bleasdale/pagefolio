'use client'; //Dev only disable later

import { useUser } from '@auth0/nextjs-auth0';
import styles from "@/app/styles/home.module.css";

import samplestyles from "@/app/styles/samplestyles.module.css";

export default function Home() {
  const { user, error, isLoading } = useUser();

  return(
    <div className={styles.Home}>
      <div className={styles.main}>
        <h1>PageFolio Testing Enviroment</h1>
        <p>The following pages are sample pages.</p>
        <div className={styles.SampleLink}>
          <a href="/shelloil" style={{backgroundColor: '#D52B1E', color: '#ffffff'}}>
            <p>Shell Oil Co</p>
          </a>
        </div>
        <div className={styles.SampleLink}>
          <a href="/coffeeplanet" style={{backgroundColor: '#000000', color: '#ffffff'}}>
            <p>Coffee Planet</p>
          </a>
        </div>
        {user && <p>{user.nickname}</p>}
        <a href="/auth/login">Login</a>
        <a href="/auth/logout">Logout</a>
        <a href="/s/build">Build</a>

        <div style={{textAlign: "left", display:"flex", flexDirection:"column", gap:"20px"}}>
          <h1 className={samplestyles.majorheading}>Major Title</h1>
          <h1 className={samplestyles.heading}>Heading</h1>
          <h2 className={samplestyles.subheading}>Sub heading</h2>
          <h3 className={samplestyles.minorheading}>Minor Heading</h3>
          <p className={samplestyles.paragraph}>Paragraph</p>
          <p className={samplestyles.info}>Info</p>
          <p className={samplestyles.error}>Error</p>
          <p className={samplestyles.link}>Link</p>
          <button className={samplestyles.button}>Button</button>
        </div>


      </div>
    </div>
  );
}