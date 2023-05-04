import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Center, OrbitControls, OrbitControlsChangeEvent } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import BadgeText from "./timeMachineScene/BadgeText";
import PlaceDisplay from "./timeMachineScene/displays/PlaceDisplay";
import TargetDateDisplay from "./timeMachineScene/displays/TargetDateDisplay";
import CurrentDateDisplay from "./timeMachineScene/displays/CurrentDateDisplay";
import DateControlHandler from "./timeMachineScene/controls/dateControls/DateControlHandler";
import TextMachine from "./timeMachineScene/displays/TextMachine";
import BasicWorld from "./timeMachineScene/world/BasicWorld";
import Garage from "./timeMachineScene/world/garage/Garage";
import { useControls } from "leva";

const deg2rad = (degrees: number) => degrees * (Math.PI / 100);

const Experience = () => {
  const [rotationY, setRotationY] = useState(0);
  const [rotationAnimationIsFinished, setRotationAnimationIsFinished] =
    useState(false);

  const { camera } = useThree();
  // @ts-ignore
  const ref = useRef<OrbitControls>(null)

  const { postionObj } = useControls("cameraPos", {
    postionObj: {
      value: [-4.24, 0.26, 4.76],
      step: 0.01,
      joystick: "invertY",
    },
  });

  console.log(ref)

  useFrame((state, delta) => {
    if (!rotationAnimationIsFinished) {
      state.camera.position.set(-4.24, 0.26, 4.76);
      state.camera.rotateOnAxis(new THREE.Vector3(-1, 0, 0), 0.528);
      state.camera.rotation.set(-0.743, -0.528, -0.433);
      setRotationAnimationIsFinished(true);
    }
  });

  return (
    <>
      <Perf position="top-left" />

      <color args={["#241a1a"]} attach="background" />

      <OrbitControls ref={ref} makeDefault enabled={false}  />

      {/* -1  -0.5 */}

      <Center position-y={-1}>
        <group scale={0.5} position-y={-0.5}>
          <BasicWorld />
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
        </group>

        <Garage />
      </Center>
    </>
  );
};

export default Experience;
