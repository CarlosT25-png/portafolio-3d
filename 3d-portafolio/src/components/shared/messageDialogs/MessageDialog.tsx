import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Dog from './Dog'
import styles from './MessageDialog.module.css'
import TypingEffectText from './TypingEffectText'

interface Props {
  title?: string
  message: string
  onClick?: Function,
  showAnimation: boolean
}

const MessageDialog = ({ title, message, onClick, showAnimation }: Props) => {
  const divRef = useRef<HTMLDivElement>(null!)
  const [titleIsDone, setTitleIsDone] = useState(title ? false : true)
  const [messageIsDone, setMessageIsDone] = useState(false)
  const [messageDialogIsDone, setMessageDialogIsDone] = useState(false)
  const [animationCompleted, setAnimationCompleted] = useState( showAnimation ? false : true)

  const clickHandler = () => {
    if (onClick && messageDialogIsDone) onClick()
  }

  // Animation

  if(showAnimation) {
    gsap.to(divRef.current, {
      opacity: 1,
      delay: 0.4,
      duration: 0.8,
      onComplete: () => {
        setAnimationCompleted(true)
      }
    })
  }

  return (
    <>
      <div
        style={{
          width: `${window.innerWidth}px`,
          height: `${window.innerHeight}px;`,
          overflow: 'hidden',
        }}
      >
        <div ref={divRef} className={styles['message-container']} style={{ opacity: showAnimation ? 0 : 1 }} onClick={clickHandler}>
          {animationCompleted && (
            <div className={styles['main-container']}>
              {title && (
                <h2>
                  <TypingEffectText
                    messageText={title}
                    speedEffect={20}
                    onComplete={() => setTitleIsDone(true)}
                  />
                </h2>
              )}
              {titleIsDone && (
                <p>
                  <TypingEffectText
                    messageText={message}
                    speedEffect={10}
                    onComplete={() => setMessageIsDone(true)}
                  />
                </p>
              )}
              {messageIsDone && (
                <a className={styles['next-btn']}>
                  <TypingEffectText
                    messageText='click to continue...'
                    speedEffect={40}
                    onComplete={() => setMessageDialogIsDone(true)}
                  />
                </a>
              )}
            </div>
          )}
        </div>
        <Dog showAnimation={showAnimation ? true : false} />
      </div>
    </>
  )
}

export default MessageDialog
