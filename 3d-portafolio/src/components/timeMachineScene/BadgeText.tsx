import { Text } from "@react-three/drei";

const BadgeText = () => {
  return (
    <Text
          font="/fonts/patua-one-v16-latin-regular.woff"
          fontSize={2.3}
          scale={0.028}
          color={'#dee1dc'}
          // maxWidth={20}
          position={[ 0.02, 2.16, -0.91]}
          rotation={[-1.40, -0.13, -0.66]}
        >
          Carlos's Time Travel Machine
        </Text>
  );
}

export default BadgeText;