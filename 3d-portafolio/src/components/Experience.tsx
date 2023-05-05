import { useRef, useState } from "react";
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
import Boxes from "./timeMachineScene/world/garage/Boxes";
import { gsap } from "gsap";
import { useControls } from "leva";
import TextSign from "./timeMachineScene/world/garage/TextSign";


const Experience = () => {
  const [rotationY, setRotationY] = useState(0);

  const { camera } = useThree();
  // @ts-ignore
  const ref = useRef<OrbitControls>(null);

  const { rotationObj, positionObj } = useControls("cameraPos", {
    rotationObj: {
      value: [-0.743, -0.528, -0.433],
      step: 0.01,
      joystick: "invertY",
    },
    positionObj: {
      value: [-4.24, 0.26, 4.76],
      step: 0.01,
      joystick: "invertY",
    },
  });

  console.log(ref);

  // Animations

  gsap.fromTo(camera.rotation, {
    x: -0.51,
    y: -0.65,
    z: -0.33
  }, {
    x: -0.743,
    y: -0.528,
    z: -0.433,
    duration: 4,
    delay: 2,
    ease: 'ease-in'
  })

  gsap.fromTo(camera.position, {
    x: -4.24,
    y:  0.26,
    z: 4.76
  }, {
    x: -4.24,
    y:  0.26,
    z: 4.76,
    duration: 4,
    delay: 2,
    ease: 'ease-in'
  })

  return (
    <>
      <Perf position="top-left" />

      <color args={["#241a1a"]} attach="background" />

      <OrbitControls ref={ref} makeDefault enabled={true} />

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
        <Boxes />
        <TextSign />
      </Center>
    </>
  );
};

export default Experience;
