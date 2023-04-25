import { ThreeEvent } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useDrag } from 'react-use-gesture';
import * as THREE from 'three';

type MeshProps = JSX.IntrinsicElements['mesh'];

const MonthControl = () => {

  const dragHandler = ( ev: ThreeEvent<PointerEvent>) => {
    console.log(ev)
  }

  const bind = useDrag(
    ({ offset: [x, y] }) => {
      console.log('offset')
      console.log(x, y)
      // const [, , z] = position;
      // setPosition([x / aspect, -y / aspect, z]);

    },
    { pointerEvents: true }
  )

  console.log(bind)


  return (
    <group position={[ -1.25, 1.915, 0 ]} scale={0.08} >
      <mesh rotation-y={0.9} rotation-z={0.15} {...bind()}>
        <boxGeometry args={[0.2, 0.1]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </group>
  );
};

export default MonthControl;
