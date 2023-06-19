import { Text, Image } from '@react-three/drei'
import { useControls } from 'leva'
import { useEffect } from 'react'

const TextMachine = () => {
  return (
    <>
      {/* UP RIGHT SIDE */}
      <group position={[0.96, 2.1555, -0.24]} rotation={[-1.45, -0.1, -0.65]}>
        {/* Travel text */}
        <Text
          font='/fonts/patua-one-v16-latin-regular.woff'
          scale={0.05}
          position-y={-0.15}
          position-x={0.375}
          fillOpacity={0.7}
          color={'#070705'}
        >
          Travelling
        </Text>

        {/* On text */}
        <Text
          font='/fonts/patua-one-v16-latin-regular.woff'
          scale={0.05}
          position-y={-0.15}
          position-x={-0.365}
          fillOpacity={0.7}
          color={'#070705'}
        >
          On
        </Text>
      </group>

      {/* BOTTOM SIDE */}
      <group position={[-1.3, 1.89, 0.05]} rotation={[-1.46, -0.09, -0.66]}>
        <Text
          font='/fonts/patua-one-v16-latin-regular.woff'
          scale={0.04}
          position-y={0}
          position-x={0.01}
          fillOpacity={0.7}
          color={'#070705'}
        >
          Month
        </Text>
        <Text
          font='/fonts/patua-one-v16-latin-regular.woff'
          scale={0.04}
          position-y={0}
          position-x={0.275}
          fillOpacity={0.7}
          color={'#070705'}
        >
          Day
        </Text>
        <Text
          font='/fonts/patua-one-v16-latin-regular.woff'
          scale={0.04}
          position-y={0}
          position-x={0.535}
          fillOpacity={0.7}
          color={'#070705'}
        >
          Year
        </Text>
        <Text
          font='/fonts/patua-one-v16-latin-regular.woff'
          scale={0.04}
          position-y={0}
          position-x={0.875}
          fillOpacity={0.7}
          color={'#070705'}
        >
          Hour
        </Text>
        <Text
          font='/fonts/patua-one-v16-latin-regular.woff'
          scale={0.04}
          position-y={0}
          position-x={1.129}
          fillOpacity={0.7}
          color={'#070705'}
        >
          Minute
        </Text>
        <Text
          font='/fonts/patua-one-v16-latin-regular.woff'
          scale={0.05}
          position-y={0.32}
          position-x={0.6}
          fillOpacity={0.7}
          color={'#070705'}
        >
          Date Controls
        </Text>
      </group>

      {/* BOTTOM SIDE */}
      <group position={[0.626, 2.0178, 0.565]} rotation={[-1.46, -0.09, -0.66]}>
        {/* Vertical line */}
        <mesh position-x={-0.05}>
          <boxGeometry args={[0.015, 0.6, 0.01]} />
          <meshBasicMaterial color={'#545452'} />
        </mesh>
        <mesh position-x={-0.02}>
          <boxGeometry args={[0.015, 0.6, 0.01]} />
          <meshBasicMaterial color={'#545452'} />
        </mesh>
        <mesh position-x={-0.03} position-y={0.293}>
          <boxGeometry args={[0.03, 0.015, 0.01]} />
          <meshBasicMaterial color={'#545452'} />
        </mesh>
        {/* Right line */}
        <mesh position-x={0.01} position-y={-0.25} rotation-z={-0.5}>
          <boxGeometry args={[0.015, 0.13, 0.01]} />
          <meshBasicMaterial color={'#545452'} />
        </mesh>
        <mesh position-x={0.015} position-y={-0.3} rotation-z={-0.5}>
          <boxGeometry args={[0.015, 0.2, 0.01]} />
          <meshBasicMaterial color={'#545452'} />
        </mesh>
        <mesh position-x={0.055} position-y={-0.2095} rotation-z={-0.5}>
          <boxGeometry args={[0.03, 0.015, 0.01]} />
          <meshBasicMaterial color={'#545452'} />
        </mesh>
        {/* Left line */}
        <mesh position-x={-0.08} position-y={-0.25} rotation-z={0.5}>
          <boxGeometry args={[0.015, 0.13, 0.01]} />
          <meshBasicMaterial color={'#545452'} />
        </mesh>
        <mesh position-x={-0.085} position-y={-0.3} rotation-z={0.5}>
          <boxGeometry args={[0.015, 0.2, 0.01]} />
          <meshBasicMaterial color={'#545452'} />
        </mesh>
        <mesh position-x={-0.125} position-y={-0.2095} rotation-z={0.5}>
          <boxGeometry args={[0.03, 0.015, 0.01]} />
          <meshBasicMaterial color={'#545452'} />
        </mesh>
      </group>
      {/* Travel Text lever */}
      <group position={[0.626, 2.0178, 0.565]} rotation={[-1.46, -0.09, -0.66]}>
        <Text
          font='/fonts/patua-one-v16-latin-regular.woff'
          scale={0.07}
          // position-y={-0.15}
          position-x={-0.03}
          position-y={-0.5}
          fillOpacity={0.7}
          color={'#070705'}
        >
          Travel
        </Text>
      </group>
    </>
  )
}

export default TextMachine
