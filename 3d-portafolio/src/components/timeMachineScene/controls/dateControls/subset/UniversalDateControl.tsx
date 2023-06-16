import { useThree } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import { useSpring, a } from "@react-spring/three";
import { useDispatch, useSelector } from "react-redux";
import * as THREE from 'three' 
import { useState, useEffect } from "react";
import { isMobileOrTablet } from "../../../../shared/utils/ResponsiveCheck";

type MeshProps = JSX.IntrinsicElements["mesh"];

interface Props {
  timeDuration: number,
  dispatchFn: Function, 
  position: THREE.Vector3,
}

const OFFSET_RANGE = isMobileOrTablet() ? 0.55 : 0.95;;

const UniversalDateControl = ({ timeDuration, dispatchFn, position }: Props) => {

  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width;
  const [ hovered, setHovered ] = useState(false);
  const dispatch = useDispatch();

  const [spring, set] = useSpring(() => ({ scale: [1, 1, 1], position: [0, 0, 0], config: { friction: 10 } }))
  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) => {
      let offset = y / aspect;
      let offsetVal = y / aspect;

      // Clamp offset value to within the range of -1 to 0
      offset = Math.max(-OFFSET_RANGE, Math.min(0, offset));
      offsetVal = Math.max(-1, Math.min(0, offsetVal));
    
      let numberValue = offsetVal * timeDuration * -1;
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
    <group position={position} scale={isMobileOrTablet() ? [0.14, 0.7, 0.15] : 0.12}>
      {/* @ts-ignore */}
      <a.mesh rotation-y={isMobileOrTablet() ? 0.92 : 0.9} rotation-z={0.1} {...bind()} {...spring} onPointerEnter={() => setHovered(true)} onPointerLeave={ () => setHovered(false)} >
        <boxGeometry args={[0.2, 0.1]} />
        <meshBasicMaterial color="red" />
      </a.mesh>
    </group>
  );
}

export default UniversalDateControl;