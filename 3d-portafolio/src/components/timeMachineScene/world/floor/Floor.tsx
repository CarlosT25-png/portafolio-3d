import { Environment, useGLTF } from "@react-three/drei";

const Floor = () => {

  const model = useGLTF('/models/timeMachineScene/wood-floor.glb')
  const wallModel = useGLTF('/models/timeMachineScene/brick-wall.glb')

  console.log(wallModel)

  return (
    <>
      {/* Shaddow is missing */}
      <Environment preset="sunset" />
      <group position-y={-1} scale={2}>
        <primitive object={model.scene} />
      </group>
      {/* <group position-y={-1} scale={2}>
        <primitive object={wallModel.scene} />
      </group> */}
      {/* <mesh rotation-x={-Math.PI * 0.5} position-y={-1}>
        <planeGeometry args={[15, 15]} />
        <meshBasicMaterial
          color={'#7c3b2e'}
        />
      </mesh> */}
    </>
  );
};

export default Floor;
