import { Clone, Environment, useGLTF } from "@react-three/drei";

const Garage = () => {
  const model = useGLTF("/models/timeMachineScene/garage.glb");

  return (
    <>
      {/* Shaddow is missing */}
      <Environment preset="sunset" />
      <group position-y={-1} scale={1}>
        <group rotation-y={-2.24}>
          {/* <primitive object={model.scene} /> */}
          <Clone object={model.scene} />
          {/* <Clone object={model.scene} position-x={3.95} /> */}
        </group>
      </group>  
    </>
  );
}

export default Garage;