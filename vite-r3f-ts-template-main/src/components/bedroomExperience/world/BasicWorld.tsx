import { Environment, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import Poster from "./scene/Poster";
import Lights from "./scene/Lights";
import PlayRecord from "./scene/PlayRecord";

const BasicWorld = () => {
  const { gl } = useThree();
  const model = useGLTF("/models/bedroomScene/bedroom-draco.glb");

  console.log(model.scene)
  // console.log(model.nodes)

  model.scene.castShadow = true;
  model.scene.receiveShadow = true;


  return (
    <>
      <Lights />
      <group>
        <primitive object={model.scene} />
      </group>
      <Poster />
      <PlayRecord />
    </>
  );
};

export default BasicWorld;
