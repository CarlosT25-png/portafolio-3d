import { useThree } from "@react-three/fiber";

const CameraAnimation = () => {

  const { camera } = useThree()

  gsap.to(camera.position, {
    x: -1,
    yoyo: true,
    duration: 1,
    repeat: -1
  })

  return (
    null
  );
}

export default CameraAnimation;