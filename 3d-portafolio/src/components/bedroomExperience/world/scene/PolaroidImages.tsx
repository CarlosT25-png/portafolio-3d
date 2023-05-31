import { Image } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as THREE from 'three'
import { animationsBedroomActions } from '../../../../store'
import { gsap } from 'gsap'

const PolaroidImages = () => {
  const [isEnterPlaying, setIsEnterPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)
  const picturesRef = useRef<THREE.Mesh>(null!)
  const { camera } = useThree()
  const dispatch = useDispatch()

  const mouseEnterAnimation = () => {
    setIsEnterPlaying(true)
    dispatch(animationsBedroomActions.setIsFocusAnObject(true))

    if (picturesRef.current) {
      camera.lookAt(picturesRef.current.position)
    }
    gsap.to(camera.position, {
      x: 0.1,
      y: 0.1580,
      z: -0.3147,
      duration: 1.5,
    })
    gsap.to(camera.rotation, {
      // -1.60,-0.01,-2.49
      x: -1.3278,
      y: -1.5570,
      z: -1.3278,
      duration: 1.5,
    })

    setTimeout(() => {
      setIsEnterPlaying(false)
    }, 1500)
  }

  const mouseLeaveAnimation = () => {
    dispatch(animationsBedroomActions.setIsFocusAnObject(false))
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

    setTimeout(() => {
      setIsEnterPlaying(false)
    }, 1500)
  }

  const onMouseEnter = () => {
    if (!isEnterPlaying) {
      if(camera.position.x !== 0.1 && camera.position.y !== 0.158){
        mouseEnterAnimation()
      }
    }
  }

  const onMouseLeave = () => {
    if (!isEnterPlaying) {
      mouseLeaveAnimation()
    }
  }

  // Pointer handler

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  return (
    <>
      <group>
        {/* Whis will act as the device box */}
        <mesh
          ref={picturesRef}
          rotation={[0, - Math.PI * 0.5, 0]}
          position={[1.06, 0.82, 0.525]}
          onClick={onMouseEnter}
          onPointerMissed={onMouseLeave}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <planeGeometry args={[0.37, 0.28]} />
          <meshBasicMaterial color={'#eeeeee'} opacity={0} transparent />
        </mesh>

        {/* Threejs Journey */}
        <Image
          url='/images/bedroom/polaroidPictures/three-js-journey.jpg' 
          rotation={[0, - Math.PI * 0.5, 0]}
          position={[1.072, 0.904, 0.3965]}
          scale-y={0.066}
          scale-x={0.076}
          onClick={() => window.open('https://threejs-journey.com/', '_blank')!.focus()}
        />

        {/* Marianne Gallo */}
        <Image
          url='/images/bedroom/polaroidPictures/attic.jpg' 
          rotation={[0, - Math.PI * 0.5, 0]}
          position={[1.072, 0.875, 0.538]}
          scale-y={0.042}
          scale-x={0.074}
          onClick={() => window.open('https://www.linkedin.com/in/marianne-gallo/', '_blank')!.focus()}
        />
        <Image
          url='/images/bedroom/polaroidPictures/bedroom.jpg' 
          rotation={[0, - Math.PI * 0.5, 0]}
          position={[1.072, 0.817, 0.4905]}
          scale-y={0.066}
          scale-x={0.076}
          onClick={() => window.open('https://www.linkedin.com/in/marianne-gallo/', '_blank')!.focus()}
        />
      </group>
    </>
  )
}

export default PolaroidImages
