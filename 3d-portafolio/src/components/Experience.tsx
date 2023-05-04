import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  Center,
  OrbitControls,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import BadgeText from "./timeMachineScene/BadgeText";
import PlaceDisplay from "./timeMachineScene/displays/PlaceDisplay";
import TargetDateDisplay from "./timeMachineScene/displays/TargetDateDisplay";
import CurrentDateDisplay from "./timeMachineScene/displays/CurrentDateDisplay";
import DateControlHandler from "./timeMachineScene/controls/dateControls/DateControlHandler";
import TextMachine from "./timeMachineScene/displays/TextMachine";
import BasicWorld from "./timeMachineScene/world/BasicWorld";
import Garage from "./timeMachineScene/world/garage/Garage";

const Experience = () => {

  const { camera } = useThree()

  useEffect(() => {
    console.log(camera.position)
  }, [camera ])

  return (
    <>
      <Perf position="top-left" />

      <color args={["#241a1a"]} attach="background" />

      <OrbitControls makeDefault enabled={true} />

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
