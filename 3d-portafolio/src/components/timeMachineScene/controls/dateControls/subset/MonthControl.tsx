import { useThree } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import { useSpring, a } from "@react-spring/three";
import { useDispatch } from "react-redux";
import { dateActions } from '@/store'

type MeshProps = JSX.IntrinsicElements["mesh"];

const MONTH_DURATION = 12;
const OFFSET_RANGE = 1;

const MonthControl = () => {
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width;
  const dispatch = useDispatch();

  const [spring, set] = useSpring(() => ({ scale: [1, 1, 1], position: [0, 0, 0], config: { friction: 10 } }))
  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) => {
      let offset = y / aspect;

      // Clamp offset value to within the range of -1 to 0
      offset = Math.max(-OFFSET_RANGE, Math.min(0, offset));
    
      let month = offset * MONTH_DURATION * -1;
      month = Math.round(month) + 1
      month = Math.min(month, 12)
      dispatch(dateActions.setMonth(month))
      return set({ position: [-offset ,-offset, offset] })
    },
    onHover: ({ hovering }) => set({ scale: hovering ? [1.2, 1.2, 1.2] : [1, 1, 1] })
  })

  return (
    <group position={[-1.25, 1.915, 0]} scale={0.08} >
      {/* @ts-ignore */}
      <a.mesh rotation-y={0.9} rotation-z={0.15} {...bind()} {...spring}>
        <boxGeometry args={[0.2, 0.1]} />
        <meshBasicMaterial color="red" />
      </a.mesh>
    </group>
  );
};

export default MonthControl;
