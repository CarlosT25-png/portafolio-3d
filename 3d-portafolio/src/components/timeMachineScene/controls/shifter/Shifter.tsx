import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from 'three'
import { useThree } from "@react-three/fiber";
import { useSpring, a } from "@react-spring/three";
import { useGesture } from "@use-gesture/react";
import { useDispatch } from "react-redux";
import { globalConfigActions } from "../../../../store";
import { scenes } from "../../../../store/global/globalConfigSlice";
import { createPortal } from "react-dom";
import { mountOverlay } from "../../../shared/html/FadeInOverlay";
import { TimeMachineSounds } from "../../sounds/TimeMachineSounds";

const Shifter = ( ) => {

  // Model

  const model = useGLTF('/models/timeMachineScene/shifter.glb');
  const shifterRef = useRef<THREE.Group>(null)
  const [ hovered, setHovered ] = useState(false);

  // Animation

  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width;
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [ isDragging, setIsDragging ] = useState(false)
  const [ internalPos, setInternalPos ] = useState<THREE.Vector3>(null!)
  const disptach = useDispatch();

  const [spring, set] = useSpring(() => ({ scale: [1, 1, 1], position: [0, 0, 0], config: { friction: 20 } }))
  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) => {
      let offset = y / aspect;
      setIsDragging(true)

      // Clamp offset value to within the range of 0 to 0.5
      offset = Math.max(0 , Math.min(0.5, offset));

      if (!isAudioPlaying) {
        const audio = new Audio('/sounds/timeMachineScene/lever.mp3')
        audio.volume = 0.4;
        audio.play();
        setIsAudioPlaying(true);
      }
      // Here I fix the position by some decimals
      setInternalPos(new THREE.Vector3(-(offset*0.78) ,(offset * 0.55) * -1, offset))
      return set({ position: [-(offset*0.78) ,(offset * 0.55) * -1, offset] })
    },
    onDragEnd: () => { setIsAudioPlaying(false), setIsDragging(false) },
    onHover: ({ hovering }) => set({ scale: hovering ? [1, 1, 1] : [1, 1, 1] })
  })

  // Change scene
  useEffect(() => {
    if( internalPos instanceof THREE.Vector3){
      if(isDragging === false) {
        // Check if the lever has reached the bottom
        if(internalPos.x === -0.39 && internalPos.y === -0.275 && internalPos.z === 0.5){
          const snd = TimeMachineSounds.getInstance()
          snd.stopSounds();
          mountOverlay(2);
          setTimeout(() => {
            disptach(globalConfigActions.setScene(scenes.TRANSITION))
          }, 2500)
        }
      }
    }
  }, [isDragging])

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered])

  return (
    <group position={[0.3, -0.8, 0]}>
      {/* @ts-ignore */}
      <a.group ref={shifterRef}  rotation-y={-2.24} {...bind()} {...spring}  onPointerEnter={() => setHovered(true)} onPointerLeave={ () => setHovered(false)} >
      <primitive object={model.scene} />
    </a.group>
    </group>
  );
}

export default Shifter;