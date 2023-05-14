import { PositionalAudio } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three'


const PlayRecord = () => {
  return (
    <mesh scale={0.1}>
      <boxBufferGeometry attach='geometry' />
      <meshBasicMaterial attach='material' color='black' />
      {/* @ts-ignore */}
      <PositionalAudio url='/sounds/timeMachineScene/machine.mp3' />
    </mesh>
  )
}

export default PlayRecord
