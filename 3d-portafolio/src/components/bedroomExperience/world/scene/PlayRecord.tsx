import { PositionalAudio } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three'


const PlayRecord = () => {
  return (
    <mesh position={[ -0.6, 0.5, 0 ]} scale={0.01}>
      <boxBufferGeometry attach='geometry' />
      <meshBasicMaterial attach='material' color='black' />
      {/* @ts-ignore */}
      <PositionalAudio url='/sounds/timeMachineScene/machine.mp3' autoplay loop/>
    </mesh>
  )
}

export default PlayRecord
