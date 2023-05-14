import { Environment, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const BasicWorld = () => {
  const { gl } = useThree();
  const model = useGLTF("/models/bedroomScene/bedroom-draco.glb");

  console.log(model.scene)
  console.log(model.nodes)


  return (
    <>
      <Environment preset="city" />
      <group rotation-y={-3.25}>
        <primitive object={model.scene} />
      </group>
    </>
  );
};

export default BasicWorld;
