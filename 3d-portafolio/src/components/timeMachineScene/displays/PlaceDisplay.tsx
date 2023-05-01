import { Text } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useState } from "react";

const PlaceDisplay = () => {

  // Typing effect
  const [text, setText] = useState("");
  const [fullText, setFullText] = useState(
    "Carlos's Bedroom"
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      setTimeout(() => {
        setText(text + fullText[index])
        setIndex(index + 1)
      }, 160)
    }
  }, [index])


  return (
    <group position={[-0.41, 2.045, -0.46]} rotation={[-1.46, -0.09, -0.66]}>
      <mesh>
        <planeGeometry args={[0.83, 0.15]} />
        <meshBasicMaterial color="#6fa23f" />
      </mesh>

      <Text
        font="/fonts/vt323-v17-latin-regular.woff"
        scale={0.07}
        position-z={0.001}
        position-x={-0.15}
        color="#203b32"
      >
        {text}
      </Text>
      
      <Text
        font="/fonts/patua-one-v16-latin-regular.woff"
        scale={0.06}
        position-y={0.18}
      >
        Destination
      </Text>
    </group>
  );
};

export default PlaceDisplay;
