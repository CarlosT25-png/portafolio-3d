import { Environment, useGLTF, useHelper } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from 'three'

const Garage = () => {
  const directionalLight = useRef<THREE.SpotLight>(null)
  const model = useGLTF("/models/timeMachineScene/attic-draco.glb");
  // @ts-ignore
  useHelper(directionalLight, THREE.SpotLightHelper, 1)

  return (
    <>
      {/* Shaddow is missing */}
      {/* <Environment preset="city" /> */}
      <spotLight position={[-2.5, 4, 3]} rotation={[0, -0.528, 0]} castShadow ref={directionalLight} intensity={1.3} />
      <group position-y={-1} scale={1}>
        <group rotation-y={-2.24}>
          <primitive object={model.scene} />
        </group>
      </group>  
    </>
  );
}

export default Garage;