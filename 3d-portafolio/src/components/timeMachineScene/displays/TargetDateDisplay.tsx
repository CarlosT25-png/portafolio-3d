import { Text } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { dateActions } from "@/store";

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

const TargetDateDisplay = () => {
  const dispatch = useDispatch()
  const month = useSelector<RootState>( state => state.date.month) as string;
  const day = useSelector<RootState>( state => state.date.day) as number;
  const year = useSelector<RootState>( state => state.date.year) as number;
  const hour = useSelector<RootState>( state => state.date.hour) as number;
  const minute = useSelector<RootState>( state => state.date.minute) as number;

  // Typing effect
  const [text, setText] = useState("");
  const [fullText, setFullText] = useState(`${month}/${day}/${(+year)+2005} ${hour}:${minute}`);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 160);
    }
  }, [index]);

  // Check if there is any update in the date slice
  useEffect(() => {
    const formattedHour = hour - 1 === 0 ? '00' : `${ hour - 1}`
    const formattedMinute = minute - 1 === 0 ? '00' : `${ minute - 1}`

    setText(`${month}/${day}/${(+year)+2005} ${hour}:${minute}`) 
  }, [month, day, year, hour, minute])
  
  useEffect(() => {
    const availableDays = getDaysInMonth(parseInt(month), (+year) + 2005 )
    dispatch(dateActions.setAvailableDays(availableDays))
    if( day > availableDays ) dispatch(dateActions.setDay(availableDays))
  }, [month, year])

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


      <Text
        font="/fonts/patua-one-v16-latin-regular.woff"
        scale={0.06}
        position-y={0.18}
        position-x={-0.25}
        fillOpacity={0.7}
        color={'#070705'}
      >
        Target Date
      </Text>
    </group>
  );
};

export default TargetDateDisplay;
