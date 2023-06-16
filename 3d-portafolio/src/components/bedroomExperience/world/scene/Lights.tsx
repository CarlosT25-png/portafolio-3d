import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { DirectionalLightHelper, DirectionalLight, PointLightHelper, PointLight, RectAreaLight } from "three";
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import LavaLamp from "./LavaLamp";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { getLightIntensityByHour } from "../../utils/LightsPerHour";

const Lights = () => {
  const hourSelected = useSelector<RootState>(state => state.date.hour) as number
  const ambientLightIntensity: number = getLightIntensityByHour(hourSelected)

  const directionalLightHelper = useRef<DirectionalLight>(null!);
  // useHelper(directionalLightHelper, DirectionalLightHelper);

  const pointLightHelper = useRef<PointLight>(null!);
  // useHelper(pointLightHelper, PointLightHelper);
  const pointLightHelper2 = useRef<PointLight>(null!);
  // useHelper(pointLightHelper2, PointLightHelper);

  const rectAreaLightHelper = useRef<RectAreaLight>(null!);
  // useHelper(rectAreaLightHelper, RectAreaLightHelper);

  return (
    <>
      {/* This light acts like the sun */}
      <directionalLight ref={directionalLightHelper} color="#FFFFFF" intensity={ambientLightIntensity} position={[-0.5, 3, 3]} />
      {/* Left table light */}
      <pointLight ref={ pointLightHelper } scale={0.04} position={[ -0.41575, 0.6, -0.05 ]} color={'#fffcb6'} intensity={0.4} />
      {/* Right table light */}
      <pointLight ref={ pointLightHelper2 } scale={0.04} position={[ 0.9, 0.67, -0.05 ]} color={'#fffcb6'} intensity={0.45} />
      {/* PC Light */}
      <rectAreaLight args={['#ffffff', 6, 0.1, 0.1]} rotation={[ 0, Math.PI * 0.5, 0 ]} position={[ 0.875, 0.475, 0.425]} ref={ rectAreaLightHelper } />
      {/* Lava lamp ligth missing ... */}
      <LavaLamp />
    </>
  );
};

export default Lights;
