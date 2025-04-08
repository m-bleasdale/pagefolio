
const styles = [];

export default function NoMobile() {

  return(
    <div className={styles.Page}>
      <div className={styles.main}>
        <div className={styles.NotFoundWidget}>
            <div className={styles.NotFoundText}>
                <h1>Sorry the editor doesn't work on mobile.</h1>
                <p>But we're working on it!</p>
            </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <img src='LogoFull.png' />
      </footer>
    </div>
  );
}