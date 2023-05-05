import { Clone, useGLTF } from "@react-three/drei";

const Boxes = () => {
  const model = useGLTF("/models/timeMachineScene/boxes.glb");

  return (
    <group position-y={-1} >
      <group rotation-y={-3.8} position-z={-3}>
        <Clone object={model.scene} />
      </group>
      <group position-x={3} position-z={-1}>
        <Clone object={model.scene} />
      </group>
    </group>
  );
};

export default Boxes;
