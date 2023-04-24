import {
  Center,
  OrbitControls,
  Text,
  useGLTF,
  useTexture,
  useFont,
  PivotControls,
  TransformControls
} from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import BadgeText from "./timeMachineScene/BadgeText";
import { useRef } from "react";
import PlaceDisplay from "./timeMachineScene/PlaceDisplay";

interface timeMachineInterface {
  nodes: {
    baked: {
      geometry: THREE.BufferGeometry;
    };
    lightTravel: {
      geometry: THREE.BufferGeometry;
      position: THREE.Vector3;
    };
    lightOn: {
      geometry: THREE.BufferGeometry;
      position: THREE.Vector3;
    };
  };
}

const Experience = () => {
  const testRef = useRef<any>();
  const { nodes } = useGLTF(
    "/timeMachine.glb"
  ) as unknown as timeMachineInterface;

  const bakedTexture = useTexture("/baked.jpg");
  bakedTexture.flipY = false;

  const { rotationObj, positionObj } = useControls("text", {
    rotationObj: {
      value: [-1.46, -0.09, -0.66],
      step: 0.001,
      joystick: "invertY",
    },
    positionObj: {
      value: [-0.41, 2.045, -0.46],
      step: 0.001,
      joystick: "invertY",
    },
  });

  console.log(nodes);

  return (
    <>
      <Perf position="top-left" />
      <color args={["#241a1a"]} attach="background" />

      <OrbitControls makeDefault />

      <Center position-y={-1}>
        <group rotation-y={-2.24}>
          <mesh geometry={nodes.baked.geometry}>
            <meshBasicMaterial map={bakedTexture} />
          </mesh>

          <mesh
            geometry={nodes.lightOn.geometry}
            position={[
              nodes.lightOn.position.x - 0.045,
              nodes.lightOn.position.y - 0.7,
              nodes.lightOn.position.z - 0.245,
            ]}
          >
            <meshBasicMaterial color="#83b117" />
          </mesh>

          <mesh
            geometry={nodes.lightTravel.geometry}
            position={[
              nodes.lightTravel.position.x - 0.045,
              nodes.lightTravel.position.y - 0.7,
              nodes.lightTravel.position.z - 0.245,
            ]}
          >
            <meshBasicMaterial color="#3657d1" />
          </mesh>
        </group>

        {/* Old Time Machine Text */}
        <BadgeText />

        <PlaceDisplay />

      </Center>
    </>
  );
};

export default Experience;
