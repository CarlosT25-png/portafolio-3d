import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  Center,
  OrbitControls,
  useCamera,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import BadgeText from "./timeMachineScene/BadgeText";
import PlaceDisplay from "./timeMachineScene/displays/PlaceDisplay";
import TargetDateDisplay from "./timeMachineScene/displays/TargetDateDisplay";
import CurrentDateDisplay from "./timeMachineScene/displays/CurrentDateDisplay";
import DateControlHandler from "./timeMachineScene/controls/dateControls/DateControlHandler";
import TextMachine from "./timeMachineScene/displays/TextMachine";

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
  const ref = useRef<THREE.Group>(null);
  const { nodes } = useGLTF(
    "/timeMachine.glb"
  ) as unknown as timeMachineInterface;

  const bakedTexture = useTexture("/baked.jpg");
  bakedTexture.flipY = false;

  const { camera } = useThree();

  useEffect(() => {

  }, []);

  return (
    <>
      <Perf position="top-left" />
      <color args={["#241a1a"]} attach="background" />

      <OrbitControls makeDefault enabled={true} />


      <Center position-y={-1}>
        <group rotation-y={-2.24} ref={ref}>
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

        {/* Displays */}
        <PlaceDisplay />
        <TargetDateDisplay />
        <CurrentDateDisplay />
        
        {/* Text from the machine */}
        <TextMachine />

        {/* Date Controls */}
        <DateControlHandler />
      </Center>
    </>
  );
};

export default Experience;
