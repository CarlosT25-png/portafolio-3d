import { Center, OrbitControls } from "@react-three/drei";
import BasicWorld from "./bedroomExperience/world/BasicWorld";
import { Perf } from "r3f-perf";
import Effect from "./bedroomExperience/utils/Effect";

const BedroomExperience = () => {
  return (
    <>
      <Perf position="top-left" />

      <color args={["#241a1a"]} attach="background" />

      <OrbitControls makeDefault enabled={true} />

      <Center>
        <BasicWorld />
      </Center>

      <Effect />
    </>
  );
};

export default BedroomExperience;
