import { Environment, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import Poster from "./scene/Poster";

const BasicWorld = () => {
  const { gl } = useThree();
  const model = useGLTF("/models/bedroomScene/bedroom-draco.glb");

  console.log(model.scene)
  console.log(model.nodes)

  model.scene.castShadow = true;
  model.scene.receiveShadow = true;


  return (
    <>
      <Environment preset="city" />
      <group>
        <primitive object={model.scene} />
      </group>
      <Poster />
    </>
  );
};

export default BasicWorld;
