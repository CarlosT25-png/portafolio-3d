import { Text3D } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect } from "react";

const TextSign = () => {
  return (
    <>
      <Text3D
        font={"/fonts/future.json"}
        scale={0.25}
        position={[1.585, 1.093, -3.546]}
        rotation-y={-0.7}
        lineHeight={1}
        bevelThickness={1000}
      >
        CARLOS'S ATTIC
        <meshBasicMaterial color={"#0c24fb"} />
      </Text3D>
    </>
  );
};

export default TextSign;
