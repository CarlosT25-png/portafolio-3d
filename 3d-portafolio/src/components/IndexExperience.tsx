import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { useEffect, useState } from "react";
import { useControls } from "leva";

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
        fov: 45,
        near: 0.1,
        far: 2000,
        position: [-4.8, -0.8, 5.55],
        rotation: [0,-2 ,0]
      }}
      style={{ width: width, height: height }}
    >
      <Experience />
    </Canvas>
  );
};

export default IndexExperience;
