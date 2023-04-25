import { Text } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useState } from "react";

const TargetDateDisplay = () => {
  // const { rotationObj, positionObj } = useControls("targetDate", {
  //   rotationObj: {
  //     value: [-1.46, -0.09, -0.66],
  //     step: 0.001,
  //     joystick: "invertY",
  //   },
  //   positionObj: {
  //     value: [-0.69, 1.97, -0.11],
  //     step: 0.001,
  //     joystick: "invertY",
  //   },
  // });

  // Typing effect
  const [text, setText] = useState("");
  const [fullText, setFullText] = useState("25/07/2002 09:11");
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
    <group position={[-0.69, 1.975, -0.11]} rotation={[-1.46, -0.09, -0.66]}>
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
    </group>
  );
};

export default TargetDateDisplay;
