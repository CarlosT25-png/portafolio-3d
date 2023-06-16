import { Center, OrbitControls } from "@react-three/drei";
import BasicWorld from "./bedroomExperience/world/BasicWorld";
import CameraAnimation from "./bedroomExperience/utils/CameraAnimation";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { getBgColorByHour } from "./bedroomExperience/utils/LightsPerHour";

const BedroomExperience = () => {

  const hourSelected = useSelector<RootState>(state => state.date.hour) as number
  const bgColor: string = getBgColorByHour(hourSelected)

  return (
    <>
      {/* <Perf position="top-left" /> */}

      <color args={[bgColor]} attach="background" />

      {/* <OrbitControls makeDefault enabled={true} /> */}

      <Center>
        <BasicWorld />
      </Center>

      {/* <Effect /> */}
      <CameraAnimation />
    </>
  );
};

export default BedroomExperience;
