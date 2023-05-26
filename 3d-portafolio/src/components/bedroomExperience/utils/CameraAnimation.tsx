import { useFrame, useThree } from '@react-three/fiber'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { useControls } from 'leva'

const CameraAnimation = () => {
  const { camera } = useThree()
  const isFocusAnObject = useSelector<RootState>(
    (state) => state.animationBedroom.isFocusAnObject
  ) as Boolean

  // Debug

  const { rotationObj, positionObj, rotationSingle } = useControls("cameraPos", {
    rotationObj: {
      value: [camera.rotation.x, camera.rotation.y, camera.rotation.z],
      step: 0.01,
      joystick: "invertY",
    },
    positionObj: {
      value: [camera.position.x, camera.position.y, camera.position.z], //value: [-4.24, 0.26, 4.76],
      step: 0.01,
      joystick: "invertY",
    },
    rotationSingle: {
      value: 0, //value: [-4.24, 0.26, 4.76],
      step: 0.01,
      joystick: "invertY",
    },
  });

  useFrame((state) => {
    if (!isFocusAnObject) {
      // the first render camera.rotation.y is equal to -0.74 
      console.log(Math.sin(state.clock.getElapsedTime()) * 0.25 - 0.75);
      state.camera.rotation.set(
        camera.rotation.x,
        Math.sin(state.clock.getElapsedTime()) * 0.0078125 - 0.75,
        camera.rotation.z
      )
    }
    return null
  })

  return null
}

export default CameraAnimation
