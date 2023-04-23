import { Center, OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import * as THREE from 'three';

interface timeMachineInterface {
  nodes: {
    baked: {
      geometry: THREE.BufferGeometry,
    },
    lightTravel: {
      geometry: THREE.BufferGeometry,
      position: THREE.Vector3
    },
    lightOn: {
      geometry: THREE.BufferGeometry,
      position: THREE.Vector3
    },
  }
}

const Experience = () => {
  const { nodes } = useGLTF("/timeMachine.glb") as unknown as timeMachineInterface; 

  const bakedTexture = useTexture("/baked.jpg");
  bakedTexture.flipY = false;

  const { rotationObj } = useControls('rotation',{
    rotationObj: {
      value: {x: -2, y: 0},
      step: 0.001,
      joystick: 'invertY'
  },
});

console.log(nodes)


  return (
    <>
      <Perf position='top-left' />
      <color args={["#241a1a"]} attach="background" />

      <OrbitControls makeDefault />

      <Center rotation-y={-2.24} position-y={-1}>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>

        <mesh
          geometry={nodes.lightOn.geometry}
          position={ [ nodes.lightOn.position.x - 0.045, nodes.lightOn.position.y - 0.7, nodes.lightOn.position.z - 0.245,] }
        >
          <meshBasicMaterial color='#83b117' />
        </mesh>

        <mesh
          geometry={nodes.lightTravel.geometry}
          position={ [nodes.lightTravel.position.x - 0.045, nodes.lightTravel.position.y - 0.7, nodes.lightTravel.position.z - 0.245 ] }
        >
          <meshBasicMaterial color='#3657d1' />
        </mesh>
      </Center>
    </>
  );
};

export default Experience;
