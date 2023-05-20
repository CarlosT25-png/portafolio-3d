import { Dispatch, SetStateAction } from 'react';
import styles from './IntroScreen.module.css';

interface Props {
  onStart: Dispatch<SetStateAction<boolean>>
}

const IntroScreen = ( { onStart }: Props ) => {

  const clickHandler = () => {
    onStart(true)
  }

  return (
    <div style={{ height: `${window.innerHeight}px`, width: `${window.innerWidth}px` }} className={styles.main}>
      <div className={styles['message-container']}>
        <h2>Welcome to my portafolio</h2>
        <p>I hope you enjoy it</p>
        <a onClick={clickHandler} className={`${styles['btn']} ${styles['btn-1']}`}>Start</a>
      </div>
    </div>
  );
}

export default IntroScreen;