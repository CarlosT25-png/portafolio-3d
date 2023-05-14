
import styles from './IntroScreen.module.css';


const IntroScreen = () => {
  return (
    <div style={{ height: `${window.innerHeight}px`, width: `${window.innerWidth}px` }} className={styles.main}>
      <div className={styles['message-container']}>
        <h2>Welcome to my portafolio</h2>
        <p>I hope you enjoy it</p>
        <a className={styles.button}>Start</a>
      </div>
    </div>
  );
}

export default IntroScreen;