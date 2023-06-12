import { Dispatch, SetStateAction, useMemo } from 'react'
import styles from './IntroScreen.module.css'
import { TimeMachineSounds } from '../../timeMachineScene/sounds/TimeMachineSounds'

interface Props {
  onStart: Dispatch<SetStateAction<boolean>>
}

const IntroScreen = ({ onStart }: Props) => {
  const sound = useMemo(() => {
    return TimeMachineSounds.getInstance()
  }, [])
  
  const clickHandler = () => {
    // Fix for mobile that only plays audio in user interactions
    sound.machineSounds.start(0)
    onStart(true)
  }

  return (
    <div
      style={{ height: `${window.innerHeight}px`, width: `${window.innerWidth}px` }}
      className={styles.main}
    >
      <div className={styles['message-container']}>
        <h2 className={styles['title']}>👋 Welcome to My Portfolio</h2>
        <p className={styles['text']}>
          Hey there! Get ready to explore an extraordinary world of web development! From
          captivating designs to seamless user experiences, my portfolio is a showcase of
          my passion for frontend development. Enjoy the ride!
        </p>
        <a onClick={clickHandler} className={`${styles['btn']} ${styles['btn-1']}`}>
          Let's Dive In! 🚀
        </a>
      </div>
    </div>
  )
}

export default IntroScreen
