import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

const IndexExperience = () => {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 2000,
        position: [-3, 1.5, 4],
      }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <Experience />
    </Canvas>
  );
};

export default IndexExperience;
