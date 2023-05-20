import { Environment, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import Poster from "./scene/Poster";
import Lights from "./scene/Lights";
import PlayRecord from "./scene/PlayRecord";
import Structure from "./Structure";

interface BedroomInterface {
  nodes: {
    scene001: THREE.Group;
    library: THREE.Mesh;
    monitor001: THREE.Group;
    periferics: THREE.Group
    lightOn: {
      geometry: THREE.BufferGeometry;
      position: THREE.Vector3;
    };
  };
}

const BasicWorld = () => {
  const { gl } = useThree();

  return (
    <>
      <Lights />
      <Structure />
      <Poster />
      <PlayRecord />
    </>
  );
};

export default BasicWorld;
