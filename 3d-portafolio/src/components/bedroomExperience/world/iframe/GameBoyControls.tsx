import { ThreeEvent, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface Props {
  iframe: RefObject<HTMLIFrameElement>
}

const GameBoyControls = ({ iframe }: Props) => {
  const upArrowRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Debug

  const { sizeObj, positionObj, rotationObj } = useControls('cameraPos', {
    sizeObj: {
      value: [0.03, 0.03, 0.019],
      step: 0.001,
      joystick: 'invertY',
    },
    positionObj: {
      value: [-0.378, 0.058, 0.739], //value: [-4.24, 0.26, 4.76],
      step: 0.001,
      joystick: 'invertY',
    },
    rotationObj: {
      value: [0, 0, 0], //value: [-4.24, 0.26, 4.76],
      step: 0.001,
      joystick: 'invertY',
    },
  })

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  // Handler

  const keyPressHandler = ( key: string ) => {
    iframe.current?.contentWindow?.postMessage(key, 'https://snake-game-portafolio.vercel.app/')
    const audio = new Audio('/sounds/bedroomScene/gameboy/button1.mp3')
    audio.volume = 0.025;
    audio.play();
  }

  return (
    <group>
      {/* Up Arrow */}
      <mesh
        // ref={upArrowRef}
        rotation={[0, Math.PI * 0.71, 0]}
        position={[-0.352, 0.058, 0.734]}
        onClick={() => {
          keyPressHandler("UP")
        }}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={[0.006, 0.008, 0.006]} />
        <meshBasicMaterial opacity={0} transparent />
      </mesh>

      {/* Right Arrow */}
      <mesh
        // ref={upArrowRef}
        rotation={[0, Math.PI * 0.71, 0]}
        position={[-0.36, 0.058, 0.733]}
        onClick={() => {
          keyPressHandler("RIGHT")
        }}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={[0.006, 0.008, 0.006]} />
        <meshBasicMaterial opacity={0} transparent />
      </mesh>

      {/* Down Arrow */}
      <mesh
        // ref={upArrowRef}
        rotation={[0, Math.PI * 0.71, 0]}
        position={[-0.359, 0.058, 0.725]}
        onClick={() => {
          keyPressHandler("DOWN")
        }}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={[0.006, 0.008, 0.006]} />
        <meshBasicMaterial opacity={0} transparent />
      </mesh>

      {/* Left Arrow */}
      <mesh
        // ref={upArrowRef}
        rotation={[0, Math.PI * 0.71, 0]}
        position={[-0.351, 0.058, 0.726]}
        onClick={() => {
          keyPressHandler("LEFT")
        }}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={[0.006, 0.008, 0.006]} />
        <meshBasicMaterial opacity={0} transparent />
      </mesh>

      {/* Play button */}
      <mesh
        ref={upArrowRef}
        rotation={[0, Math.PI * 0.71, 0]}
        position={[-0.378, 0.058, 0.74]}
        onClick={() => {
          keyPressHandler("PLAY")
        }}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={[0.007, 0.008, 0.007]} />
        <meshBasicMaterial opacity={0} transparent />
      </mesh>
    </group>
  )
}

export default GameBoyControls
