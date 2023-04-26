import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useGesture } from "@use-gesture/react";
import * as THREE from "three";
import { useSpring, a } from "@react-spring/three";

type MeshProps = JSX.IntrinsicElements["mesh"];


const MonthControl = () => {
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width

  const [spring, set] = useSpring(() => ({ scale: [1, 1, 1], position: [0, 0, 0], config: { friction: 10 } }))
  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) => {
      console.log(y)
      return set({ position: [-y/aspect ,-y / aspect, y/aspect] })
    },
    onHover: ({ hovering }) => set({ scale: hovering ? [1.2, 1.2, 1.2] : [1, 1, 1] })
  })

  return (
    <group position={[-1.25, 1.915, 0]} scale={0.08} >
      {/* @ts-ignore */}
      <a.mesh rotation-y={0.9} rotation-z={0.15} {...bind()} {...spring}>
        <boxGeometry args={[0.2, 0.1]} />
        <meshBasicMaterial color="red" />
      </a.mesh>
    </group>
  );
};

export default MonthControl;
