import { Text3D } from "@react-three/drei";

const TextSign = () => {
  return (
    <>
      <Text3D
        font={"/fonts/future.json"}
        scale={0.3}
        position={[2.8, 1.25, -4.75]}
        rotation-y={-0.7}
      >
        CARLOS'S
        <meshBasicMaterial color={"#f2d8ff"} />
      </Text3D>
      <Text3D
        font={"/fonts/future.json"}
        scale={0.3}
        position={[3, 0.85, -4.5]}
        rotation-y={-0.7}
      >
        ATTIC
        <meshBasicMaterial color={"#f2d8ff"} />
      </Text3D>
    </>
  );
};

export default TextSign;
