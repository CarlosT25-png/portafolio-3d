import { Canvas } from "@react-three/fiber";
import TimeMachineExperience from "./TimeMachineExperience";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Loader } from "@react-three/drei";
import BedroomExperience from "./BedroomExperience";
import { WebGL1Renderer } from "three";
// import {  } from "three";



// const CustomWebGLRenderer = () => {
//   // @ts-ignore
//   const renderer = useMemo(() => new WebGLRenderer({ gammaOutput: true });
//   return <primitive object={renderer} />;
// };

const renderer = (canvas: any) => {
  const render = new WebGL1Renderer({ canvas });
  render.

}

const IndexExperience = () => {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  useEffect(() => {
    setWidth(`${window.innerWidth}px`);
    setHeight(`${window.innerHeight}px`);
  }, []);

  return (
    <>
      <Suspense fallback={ null }>
        <Canvas
          dpr={[1, 2]}
          gl={canvas => new WebGL1Renderer({ canvas })}
          camera={{
            fov: 35,
            near: 0.1,
            far: 2000,
            position: [-4.8, -0.2, 5.2],
          }}
          
          style={{ width: width, height: height }}
        >
          {/* <TimeMachineExperience /> */}
          <BedroomExperience />
        </Canvas>
      </Suspense>
      <Loader />
    </>
  );
};

export default IndexExperience;
