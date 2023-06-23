import { useGLTF } from "@react-three/drei";

const Garage = () => {
  const model = useGLTF("/models/timeMachineScene/attic-draco.glb");

  return (
    <>
      {/* Shaddow is missing */}
      {/* <Environment preset="city" /> */}
      <spotLight position={[-2.5, 4, 3]} rotation={[0, -0.528, 0]} castShadow intensity={1.3} />
      <group position-y={-1} scale={1}>
        <group rotation-y={-2.24}>
          <primitive object={model.scene} />
        </group>
      </group>  
    </>
  );
}

export default Garage;