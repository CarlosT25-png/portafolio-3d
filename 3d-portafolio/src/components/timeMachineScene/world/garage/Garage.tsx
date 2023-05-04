import { Environment, useGLTF, useHelper } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from 'three'

const Garage = () => {
  const directionalLight = useRef<THREE.SpotLight>(null)
  const model = useGLTF("/models/timeMachineScene/garage-draco-2.glb");
  model.scene.receiveShadow = true
  // @ts-ignore
  useHelper(directionalLight, THREE.SpotLightHelper, 1)

  return (
    <>
      {/* Shaddow is missing */}
      {/* <Environment preset="city" /> */}
      <spotLight position={[0, 2, 4]} castShadow ref={directionalLight} intensity={0.5} />
      <group position-y={-1} scale={1}>
        <group rotation-y={-2.24}>
          <primitive object={model.scene} />
        </group>
      </group>  
    </>
  );
}

export default Garage;