import { useEffect, useLayoutEffect, useRef } from "react";
import { Center, OrbitControls } from "@react-three/drei";
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
import Boxes from "./timeMachineScene/world/garage/Boxes";
import TextSign from "./timeMachineScene/world/garage/TextSign";
import { gsap } from "gsap";
import { useControls } from "leva";
import { collectGenerateParams } from "next/dist/build/utils";
import Shifter from "./timeMachineScene/controls/shifter/Shifter";
import SoundEffects from "./timeMachineScene/world/SoundEffects";

const Experience = () => {
  const { camera } = useThree();

  const cameraRef = useRef(camera);

  const machineSound = new Audio("/sounds/timeMachineScene/machine.mp3");

  // Debug

  // const { rotationObj, positionObj } = useControls("cameraPos", {
  //   rotationObj: {
  //     value: [-0.31, -0.64, -0.19],
  //     step: 0.01,
  //     joystick: "invertY",
  //   },
  //   positionObj: {
  //     value: [-4.24, 0.26, 4.76], //value: [-4.24, 0.26, 4.76],
  //     step: 0.01,
  //     joystick: "invertY",
  //   },
  // });

  // useFrame(() => {
  //   cameraRef.current.rotation.copy(camera.rotation);
  // })

  // Animations

  useLayoutEffect(() => {
    // Setting camer position
    cameraRef.current.rotation.set(-0.31, -0.64, -0.19);
    cameraRef.current.position.set(-4.24, 0.26, 4.76);
  }, []);

  gsap.to(cameraRef.current.rotation, {
    x: -0.743,
    y: -0.528,
    z: -0.433,
    duration: 4,
    delay: 3.5,
    ease: "easeIn",
  });

  return (
    <>
      <Perf position="top-left" />

      <color args={["#241a1a"]} attach="background" />

      <OrbitControls makeDefault enabled={false} />

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

          {/* Shifter */}
          <Shifter />
        </group>

        {/* Environment */}
        <Garage />
        <Boxes />
        <TextSign />

        {/* Sounds */}
        <SoundEffects fixedSoundUrl="/sounds/timeMachineScene/machine.mp3" randomSoundUrl="/sounds/timeMachineScene/electric.mp3" />
      </Center>
    </>
  );
};

export default Experience;
