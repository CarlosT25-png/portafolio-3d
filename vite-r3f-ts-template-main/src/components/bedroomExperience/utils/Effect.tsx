import { EffectComposer, Bloom } from "@react-three/postprocessing";

const Effect = () => {
  return (
    <EffectComposer multisampling={4} >
      <Bloom mipmapBlur />
    </EffectComposer>
  );
}

export default Effect;