import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from 'three'
import { useThree } from "@react-three/fiber";
import { useSpring, a } from "@react-spring/three";
import { useGesture } from "@use-gesture/react";
import { useDispatch } from "react-redux";

const Shifter = () => {

  // Model

  const model = useGLTF('/models/timeMachineScene/shifter.glb');
  const shifterRef = useRef<THREE.Group>(null)

  // Animation

  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width;
  const dispatch = useDispatch();

  const [spring, set] = useSpring(() => ({ scale: [1, 1, 1], position: [0, 0, 0], config: { friction: 20 } }))
  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) => {
      let offset = y / aspect;

      // Clamp offset value to within the range of 0 to 0.5
      offset = Math.max(0 , Math.min(0.5, offset));

      // Here I fix the position by some decimals
      return set({ position: [-(offset*0.78) ,(offset * 0.55) * -1, offset] })
    },
    onHover: ({ hovering }) => set({ scale: hovering ? [1, 1, 1] : [1, 1, 1] })
  })

  const clickHandler = () => {
    if( shifterRef.current ) {
      gsap.to(shifterRef.current.position , {
        x: -0.1,
        y: -1.1 ,
        z: 0.5,
        duration: 2,
      })
    }
  }

  return (
    <group position={[0.3, -0.8, 0]}>
      {/* @ts-ignore */}
      <a.group ref={shifterRef}  rotation-y={-2.24} {...bind()} {...spring} >
      <primitive object={model.scene} />
    </a.group>
    </group>
  );
}

export default Shifter;