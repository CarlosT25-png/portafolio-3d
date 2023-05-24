import { useEffect, useState } from 'react'
import Dog from './Dog'
import styles from './MessageDialog.module.css'
import { text } from 'stream/consumers'
import TypingEffectText from './TypingEffectText'

interface Props {
  title?: string
  message: string,
  onClick?: Function
}

const MessageDialog = ({ title, message, onClick }: Props) => {
  const [titleIsDone, setTitleIsDone] = useState(title ? false : true)
  const [messageIsDone, setMessageIsDone] = useState(false)
  const [ messageDialogIsDone, setMessageDialogIsDone ] = useState(false)

  const clickHandler = () => {
    if(onClick && messageDialogIsDone) onClick();
  }

  // Animation

  

  return (
    <>
      <div className={styles['message-container']} onClick={clickHandler}>
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
      </div>
      <Dog />
    </>
  )
}

export default MessageDialog
