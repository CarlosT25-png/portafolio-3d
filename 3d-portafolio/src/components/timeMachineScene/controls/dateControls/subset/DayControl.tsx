import { useThree } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import { useSpring, a } from "@react-spring/three";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as THREE from 'three' 
import { useState, useEffect } from "react";

type MeshProps = JSX.IntrinsicElements["mesh"];

interface Props {
  dispatchFn: Function, 
  position: THREE.Vector3,
}

const OFFSET_RANGE = 1.45;

const DayControl = ({ dispatchFn, position }: Props) => {

  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width;
  const [ hovered, setHovered ] = useState(false);
  const dispatch = useDispatch();
  
  const timeDuration = useSelector<RootState>( state => state.date.availableDays) as number;

  const [spring, set] = useSpring(() => ({ scale: [1, 1, 1], position: [0, 0, 0], config: { friction: 10 } }))
  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) => {
      let offset = y / aspect;

      // Clamp offset value to within the range of -1 to 0
      offset = Math.max(-OFFSET_RANGE, Math.min(0, offset));

      console.log(timeDuration)
    
      let numberValue = offset * timeDuration * -1;
      numberValue = Math.round(numberValue) + 1
      numberValue = Math.min(numberValue, timeDuration)
      dispatch(dispatchFn(numberValue))
      return set({ position: [-offset*0.825 ,-offset * 0.225, offset] })
    },
    onHover: ({ hovering }) => set({ scale: hovering ? [1.2, 1.2, 1.2] : [1, 1, 1] })
  })

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered])

  return (
    <group position={position} scale={0.08} >
      {/* @ts-ignore */}
      <a.mesh rotation-y={0.9} rotation-z={0.15} {...bind()} {...spring} onPointerEnter={() => setHovered(true)} onPointerLeave={ () => setHovered(false)} >
        <boxGeometry args={[0.2, 0.1]} />
        <meshBasicMaterial color="red" />
      </a.mesh>
    </group>
  );
}

export default DayControl;