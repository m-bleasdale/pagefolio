import styles from "./default.module.css";

export default function Default({slug}) {

  return(
    <div className={styles.Page}>
      <div className={styles.main}>
        <div className={styles.DefaultWidget}>
            <img src='NotBuiltYet.png' />
            <div className={styles.DefaultText}>
                <h1>Under construction</h1>
                <p><span>{slug}</span> is currently working on their site</p>
            </div>
        </div>
        <div className={styles.Claim}>
          <p>Build your PageFolio for free</p>
          <a className={styles.ClaimButton} href="/auth/login?screen_hint=signup&returnTo=/s/getstarted">Create your page</a>
          <a className={styles.WhatIs} href="/info/what-is-pagefolio">What is PageFolio?</a>
        </div>
      </div>
      <footer className={styles.footer}>
        <img src='LogoFull.png' />
      </footer>
    </div>
  );
}