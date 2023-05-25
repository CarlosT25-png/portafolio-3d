import { useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useEffect } from "react";

const CameraAnimation = () => {
  const { camera } = useThree()
  const isFocusAnObject = useSelector<RootState>(state => state.animationBedroom.isFocusAnObject) as Boolean

  useEffect(() => {
    if( !isFocusAnObject ) {
      gsap.fromTo(camera.position,{
        x: -2
      }, {
        x: -1.9,
        yoyo: true,
        duration: 4,
        repeat: -1
      })
    }
  }, [isFocusAnObject])

  return (
    null
  );
}

export default CameraAnimation;