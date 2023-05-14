import { Text } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useState } from "react";

function getFormatted(number: number): string {
  if (number < 10) {
    return `0${number}`;
  } else {
    return number.toString();
  }
}


const CurrentDateDisplay = () => {

  // Typing effect
  const today = new Date();

  const [text, setText] = useState("");
  const [fullText, setFullText] = useState(`${getFormatted(today.getMonth() + 1 )}/${getFormatted(today.getDate())}/${today.getFullYear()}`);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 160);
    }
  }, [index]);

  return (
    <group position={[0.96, 2.1555, -0.24]} rotation={[-1.45, -0.10, -0.65]}>
      <mesh>
        <planeGeometry args={[0.35, 0.12]} />
        <meshBasicMaterial color="#6fa23f" />
      </mesh>

      <Text
        font="/fonts/vt323-v17-latin-regular.woff"
        scale={0.06}
        position-z={0.001}
        color="#203b32"
      >
        {text}
      </Text>

      <Text
        font="/fonts/patua-one-v16-latin-regular.woff"
        scale={0.05}
        position-y={-0.15}
        // position-x={-0.25}
        fillOpacity={0.7}
        color={'#070705'}
      >
        Current Date
      </Text>
    </group>
  );
};

export default CurrentDateDisplay;
