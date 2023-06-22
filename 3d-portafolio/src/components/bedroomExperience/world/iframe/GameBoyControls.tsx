import { Text } from '@react-three/drei'
import { RefObject, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface Props {
  iframe: HTMLIFrameElement | RefObject<HTMLIFrameElement>
}

const GameBoyControls = ({ iframe }: Props) => {
  const upArrowRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  // Handler

  const keyPressHandler = (key: string) => {
    if(iframe instanceof HTMLIFrameElement) {
      iframe.contentWindow?.postMessage(
        key,
        'https://snake-game-portafolio.vercel.app/'
      )
    } else {
      iframe.current!.contentWindow?.postMessage(
        key,
        'https://snake-game-portafolio.vercel.app/'
      )
    }
    const audio = new Audio('/sounds/bedroomScene/gameboy/button1.mp3')
    audio.volume = 0.02
    audio.play()
  }

  return (
    <group>
      {/* Up Arrow */}
      <mesh
        // ref={upArrowRef}
        rotation={[0, Math.PI * 0.71, 0]}
        position={[-0.352, 0.058, 0.734]}
        onClick={() => {
          keyPressHandler('UP')
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
          keyPressHandler('RIGHT')
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
          keyPressHandler('DOWN')
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
          keyPressHandler('LEFT')
        }}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={[0.006, 0.008, 0.006]} />
        <meshBasicMaterial opacity={0} transparent />
      </mesh>

      {/* Play button */}
      <Text
        font={'/fonts/ibm-plex-sans-condensed-v14-latin-regular.woff'}
        rotation={[1.543, -3.186, 0.665]}
        position={[-0.372, 0.061, 0.735]}
        scale={0.0025}
        maxWidth={7}
        color={'black'}
        fillOpacity={1}
      >
        Play
      </Text>
      <mesh
        ref={upArrowRef}
        rotation={[0, Math.PI * 0.71, 0]}
        position={[-0.378, 0.058, 0.74]}
        onClick={() => {
          keyPressHandler('PLAY')
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
