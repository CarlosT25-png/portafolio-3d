import * as THREE from 'three'
import { FaChevronLeft } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { gsap } from 'gsap'
import { animationsBedroomActions } from '../../../store'
import { ObjectsToFocus } from '../../../store/global/helperSlice'
import styles from './ExitView.module.css'
import { useEffect, useRef } from 'react'

interface ExitViewProps {
  camera: THREE.Camera
}

const ExitView = ({ camera }: ExitViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null!)
  const dispatch = useDispatch()

  const exitViewClickHandler = () => {
    dispatch(animationsBedroomActions.setIsFocusAnObject(ObjectsToFocus.ALL))
    gsap.to(camera.position, {
      x: -2.43,
      y: 0.72,
      z: 2.55,
      duration: 1.5,
    })
    gsap.to(camera.rotation, {
      x: -0.32,
      y: -0.74,
      z: -0.22,
      duration: 1.5,
    })
  }

  useEffect(() => {
    gsap.set(containerRef.current, { opacity: 0 })
    gsap.to(containerRef.current, {
      opacity: 0.7,
      delay: 3,
      duration: 1.5,
    })
  }, [])

  return (
    <div ref={containerRef} className={styles['exit-view']} onClick={exitViewClickHandler}>
      <div className={styles['exit-view__text']}>
        <FaChevronLeft size={'1.5rem'} />
        <p>Go Back</p>
      </div>
    </div>
  )
}

export default ExitView
