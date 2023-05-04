import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { useEffect, useState } from "react";

const IndexExperience = () => {

  const [ width, setWidth ] = useState('')
  const [ height, setHeight ] = useState('')

  useEffect(() => {
    setWidth(`${window.innerWidth}px`)
    setHeight(`${window.innerHeight}px`)
  }, [])

  return (
    <Canvas
      camera={{
        fov: 35,
        near: 0.1,
        far: 2000,
        position: [-4.8, -0.2, 5.2],
      }}
      style={{ width: width, height: height }}
    >
      <Experience />
    </Canvas>
  );
};

export default IndexExperience;
