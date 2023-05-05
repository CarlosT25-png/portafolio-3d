import { Text3D } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import pkg from 'postprocessing';
import * as THREE from 'three'

const TextSign = () => {
  return (
    <EffectComposer multisampling={4}>
      <Text3D
        font={"/fonts/future.json"}
        scale={0.3}
        position={[2.8, 1.25, -4.75]}
        rotation-y={-0.7}
      >
        GARAGE
        <meshBasicMaterial color={"#f2d8ff"} />
      </Text3D>

      {/* @ts-ignore */}
      <Bloom  />
    </EffectComposer>
  );
};

export default TextSign;
