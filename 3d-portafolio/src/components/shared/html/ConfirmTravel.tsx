import { Dispatch, SetStateAction, useMemo } from 'react'
import styles from './IntroScreen.module.css'
import { TimeMachineSounds } from '../../timeMachineScene/sounds/TimeMachineSounds'

interface Props {
  onConfirm: Function
}

const ConfirmTravel = ({ onConfirm }: Props) => {
  const sound = useMemo(() => {
    return TimeMachineSounds.getInstance()
  }, [])
  
  const clickHandler = () => {
    onConfirm()
  }

  return (
    <div
      style={{ height: `${window.innerHeight}px`, width: `${window.innerWidth}px` }}
      className={styles.main}
    >
      <div className={styles['message-container']}>
        <h2 className={styles['title']}>Are you ready to travel?</h2>
        <p className={styles['text']}>
          This is a workaround for autoplay policies :(
        </p>
        <a onClick={clickHandler} className={`${styles['btn']} ${styles['btn-1']}`}>
          Let's Travel! 🚀
        </a>
      </div>
    </div>
  )
}

export default ConfirmTravel
