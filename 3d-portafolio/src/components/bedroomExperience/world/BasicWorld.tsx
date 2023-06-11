import Poster from "./scene/Poster";
import Lights from "./scene/Lights";
import Structure from "./Structure";
import PolaroidImages from "./scene/PolaroidImages";

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

  return (
    <>
      <Lights />
      <Structure />
      <Poster />
      <PolaroidImages />
    </>
  );
};

export default BasicWorld;
