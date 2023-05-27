import { Html } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as THREE from 'three'
import { animationsBedroomActions } from '../../../../store'
import { gsap } from 'gsap'

interface BedroomInterface {
  nodes: {
    scene001: THREE.Group
    library: THREE.Mesh
    monitor001: THREE.Group
    periferics: THREE.Group
    lightOn: {
      geometry: THREE.BufferGeometry
      position: THREE.Vector3
    }
  }
}

const GameboyScreen = () => {
  const [isEnterPlaying, setIsEnterPlaying] = useState(false)
  const [showIframe, setShowIframe] = useState(false)
  const [hovered, setHovered] = useState(false)
  const gameboyRef = useRef<THREE.Mesh>(null!)
  const htmlRef = useRef<HTMLIFrameElement>(null)
  const { camera, size } = useThree()
  const dispatch = useDispatch()

  const showIframeHandler = () => {
    setShowIframe(true)
  }

  useEffect(() => {
    if (showIframe) {
      setTimeout(() => {
        if (htmlRef.current) {
          htmlRef.current.click()
        }
      }, 500)
    }
  }, [showIframe])

  const mouseEnterAnimation = () => {
    setIsEnterPlaying(true)
    dispatch(animationsBedroomActions.setIsFocusAnObject(true))

    if (gameboyRef.current) {
      camera.lookAt(gameboyRef.current.position)
    }
    gsap.to(camera.position, {
      x: -0.485,
      y: -0.5,
      z: -0.105,
      duration: 1.5,
      onComplete: () => showIframeHandler(),
    })
    gsap.to(camera.rotation, {
      // -1.60,-0.01,-2.49
      x: -1.6,
      y: -0.01,
      z: -2.49,
      duration: 1.5,
    })

    setTimeout(() => {
      setIsEnterPlaying(false)
    }, 1500)
  }

  const mouseLeaveAnimation = () => {
    dispatch(animationsBedroomActions.setIsFocusAnObject(false))
    setShowIframe(false)
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
      // Checking if the animation is not playing
      if (camera.position.x !== -0.485 && camera.position.y !== -0.5) {
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
          ref={gameboyRef}
          rotation={[0, -0.94, 0]}
          position={[-0.36, 0.05, 0.75]}
          onClick={onMouseEnter}
          onPointerMissed={onMouseLeave}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <boxGeometry args={[0.09, 0.02, 0.07]} />
          <meshBasicMaterial opacity={0} transparent />
        </mesh>
        {showIframe && (
          <Html
            transform
            distanceFactor={0.025}
            rotation={[-1.63, 0.02, -2.493]}
            position={[-0.343, -0.02, 0.77]}
          >
            <iframe
              src='https://snake-game-portafolio.vercel.app/'
              style={{ width: '800px', height: '700px', border: 'none',opacity: 0 }}
              onLoad={() => { // To avoid white flashes while is loading
                const element = htmlRef.current;
                if (element && element.style) {
                  element.style.opacity = '1';
                }
              }}
              ref={htmlRef}
            />
          </Html>
        )}
      </group>
    </>
  )
}

export default GameboyScreen
