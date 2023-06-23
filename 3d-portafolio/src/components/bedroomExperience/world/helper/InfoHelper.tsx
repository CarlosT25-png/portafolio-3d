import { ReactNode, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { gsap } from 'gsap'
import infoLogo from '/images/bedroom/info.png'
import styles from './InfoHelper.module.css'

interface Props {
  children: ReactNode,
  onCompleteUpdate: Function
}

const InfoHelper = ({ children, onCompleteUpdate }: Props) => {
  const dispatch = useDispatch()
  const containerRef = useRef<HTMLDivElement>(null!)
  const messageRef = useRef<HTMLParagraphElement>(null!)

  useEffect(() => {
    if (containerRef.current && messageRef.current) {
      gsap.set(containerRef.current, {
        x: '-5rem',
        opacity: 0,
      })
      gsap.set(messageRef.current, {
        opacity: 0,
      })
      gsap.to(containerRef.current, {
        x: '0',
        opacity: 1,
        delay: 1,
        duration: 1,
      })
      gsap.to(messageRef.current, {
        opacity: 1,
        delay: 2,
        duration: 1,
      })
      gsap.to(containerRef.current, {
        opacity: 0,
        delay: 7,
        duration: 1,
        onComplete: () => {
          dispatch(onCompleteUpdate(true))
        },
      })
    }
  }, [containerRef, messageRef])

  return (
    <div ref={containerRef} className={styles.container}>
      <img src={infoLogo} className={styles.image} />
      <p ref={messageRef} className={styles.message}>
        {children}
      </p>
    </div>
  )
}

export default InfoHelper
