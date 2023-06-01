import { useControls } from 'leva'
import { useEffect, useState } from 'react'

const GameBoyControls = () => {
  const [hovered, setHovered] = useState(false)

  // Debug

  const { sizeObj, positionObj } = useControls('cameraPos', {
    sizeObj: {
      value: [0.03, 0.03, 0.019],
      step: 0.001,
      joystick: 'invertY',
    },
    positionObj: {
      value: [-0.36, 0.1, 0.75], //value: [-4.24, 0.26, 4.76],
      step: 0.001,
      joystick: 'invertY',
    },
  })

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  return (
    <group>
      <mesh
        // ref={gameboyRef}
        rotation={[0, -0.94, 0]}
        position={[...positionObj]}
        // onClick={onMouseEnter}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={[...sizeObj]} />
        <meshBasicMaterial opacity={1} transparent />
      </mesh>
    </group>
  )
}

export default GameBoyControls
