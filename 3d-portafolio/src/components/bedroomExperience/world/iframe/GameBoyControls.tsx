import { useControls } from 'leva'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const GameBoyControls = () => {
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

  useEffect(() => {
    if (upArrowRef.current) {
      console.log('------------------')
      console.log(upArrowRef.current.position)
      console.log(upArrowRef.current.geometry)
      console.log(sizeObj)
    }
  }, [positionObj])

  return (
    <group>
      {/* Up Arrow */}
      <mesh
        // ref={upArrowRef}
        rotation={[0, Math.PI * 0.71, 0]}
        position={[-0.352, 0.058, 0.734]}
        // onClick={onMouseEnter}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={[0.006, 0.008, 0.006]} />
        <meshBasicMaterial opacity={1} transparent />
      </mesh>

      {/* Right Arrow */}
      <mesh
        // ref={upArrowRef}
        rotation={[0, Math.PI * 0.71, 0]}
        position={[-0.36, 0.058, 0.733]}
        // onClick={onMouseEnter}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={[0.006, 0.008, 0.006]} />
        <meshBasicMaterial opacity={1} transparent />
      </mesh>

      {/* Down Arrow */}
      <mesh
        // ref={upArrowRef}
        rotation={[0, Math.PI * 0.71, 0]}
        position={[-0.359, 0.058, 0.725]}
        // onClick={onMouseEnter}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={[0.006, 0.008, 0.006]} />
        <meshBasicMaterial opacity={1} transparent />
      </mesh>

      {/* Left Arrow */}
      <mesh
        // ref={upArrowRef}
        rotation={[0, Math.PI * 0.71, 0]}
        position={[-0.351, 0.058, 0.726]}
        // onClick={onMouseEnter}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={[0.006, 0.008, 0.006]} />
        <meshBasicMaterial opacity={1} transparent />
      </mesh>

      {/* Play button */}
      <mesh
        ref={upArrowRef}
        rotation={[0, Math.PI * 0.71, 0]}
        position={[-0.378, 0.058, 0.74]}
        // onClick={onMouseEnter}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={[0.007, 0.008, 0.007]} />
        <meshBasicMaterial opacity={1} transparent />
      </mesh>
    </group>
  )
}

export default GameBoyControls
