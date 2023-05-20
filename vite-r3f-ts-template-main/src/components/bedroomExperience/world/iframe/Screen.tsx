import { Html, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { Glitch, EffectComposer, Select, Selection } from '@react-three/postprocessing'
import { GlitchMode } from 'postprocessing'
import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import * as THREE from 'three'
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

const Screen = () => {
  const [isEnterPlaying, setIsEnterPlaying] = useState(false)
  const [showIframe, setShowIframe] = useState(false)
  const [ hovered, setHovered ] = useState(false);
  const pcRef = useRef<THREE.Group>(null!)
  const screenRef = useRef<THREE.Mesh>(null!)
  const sceneRef = useRef<THREE.Scene>(null!)
  const { camera, size } = useThree()

  const model = useGLTF(
    '/models/bedroomScene/bedroom-draco.glb'
  ) as unknown as BedroomInterface

  useLayoutEffect(() => {
    camera.position.set(-2.43, 0.72, 2.55)
    camera.rotation.set(-0.32, -0.74, -0.22)
  }, [])

  const showIframeHandler = () => {
    setShowIframe(true)
    // Get the position of the mesh in 3D space
    const { x, y, z } = screenRef.current.position

    console.log(x, y, z)

    // Project the position to pixel coordinates
    camera.updateMatrix()
    camera.updateMatrixWorld()
    camera.updateProjectionMatrix()
    const screenPosition = new THREE.Vector3(x, y, z).project(camera)

    console.log(size)
    console.log(screenPosition)
    // Convert the projected coordinates to pixels
    const pixelX = (screenPosition.x * 0.5 + 0.5) * size.width
    const pixelY = (1 - (screenPosition.y * 0.5 + 0.5)) * size.height

    // Use the pixel coordinates as needed
    console.log('Mesh position in pixels:', pixelX, pixelY)
  }

  const mouseEnterAnimation = () => {
    setIsEnterPlaying(true)
    camera.lookAt(model.nodes.monitor001.position)
    gsap.to(camera.position, {
      x: 0.59,
      y: -0.24,
      z: -0.4125,
      duration: 1.5,
      onComplete: () => showIframeHandler(),
    })
    gsap.to(camera.rotation, {
      x: -1.13,
      y: -1.51,
      z: -1.13,
      duration: 1.5,
    })

    setTimeout(() => {
      setIsEnterPlaying(false)
    }, 1500)
  }

  const mouseLeaveAnimation = () => {
    // camera.position.set( -2.43, 0.72, 2.55 ) //...positionObj
    // camera.rotation.set( -0.32, -0.74, -0.22 ) //...rotationObj
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
      if (camera.position.x !== 0.59 && camera.position.y !== -0.24) {
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
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered])

  return (
    <>
      <group ref={pcRef} onClick={onMouseEnter} onPointerMissed={onMouseLeave} onPointerEnter={() => setHovered(true)} onPointerLeave={ () => setHovered(false)}>
        <primitive object={model.nodes.monitor001} />
      </group>
      {/* This will act as the real screen */}
      <group>
        <mesh
          ref={screenRef}
          rotation={[-1.51, -1.22, -1.51]}
          position={[0.89, 0.46, 0.43]}
        >
          <planeGeometry args={[0.118, 0.0915]} />
          <meshBasicMaterial color={'#5c5c5c'} />
        </mesh>
        {showIframe && (
          <Html
            transform
            distanceFactor={0.11}
            rotation={[-1.56, -1.29, -1.56]}
            position={[1.16, 0.44, 0.42]}
          >
            <iframe
              src='https://carlostorres.dev'
              style={{ width: '1000px', height: '750px', border: 'none' }}
            />
          </Html>
        )}
      </group>
    </>
  )
}

export default Screen
