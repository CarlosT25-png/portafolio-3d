import { useEffect, useLayoutEffect, useRef } from 'react'
import { Center, OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { useSelector } from 'react-redux'
import BadgeText from './timeMachineScene/BadgeText'
import PlaceDisplay from './timeMachineScene/displays/PlaceDisplay'
import TargetDateDisplay from './timeMachineScene/displays/TargetDateDisplay'
import CurrentDateDisplay from './timeMachineScene/displays/CurrentDateDisplay'
import DateControlHandler from './timeMachineScene/controls/dateControls/DateControlHandler'
import TextMachine from './timeMachineScene/displays/TextMachine'
import BasicWorld from './timeMachineScene/world/BasicWorld'
import Garage from './timeMachineScene/world/garage/Garage'
import Boxes from './timeMachineScene/world/garage/Boxes'
import TextSign from './timeMachineScene/world/garage/TextSign'
import { gsap } from 'gsap'
import Shifter from './timeMachineScene/controls/shifter/Shifter'
import { RootState } from '../store'
import { useControls } from 'leva'

const TimeMachineExperience = () => {
  const dialogIsCompleteTimeMachine = useSelector<RootState>((state) => state.globalConfig.dialogIsCompleteTimeMachine) as boolean
  // const { cameraPos, timeMachinePos } = useControls('camera', {
  //   cameraPos: {
  //     value: [-3.010, -0.250, 3.441],
  //     step: 0.001,
  //     joystick: 'invertY'
  //   },
  //   timeMachinePos: {
  //     value: [-1.968, -0.499, 2.201],
  //     step: 0.001,
  //     joystick: 'invertY'
  //   }
  // })
  const { camera } = useThree()

  const cameraRef = useRef(camera)

  // Animations

  useLayoutEffect(() => {
    // Setting camera position
    cameraRef.current.rotation.set(-0.31, -0.64, -0.19)
    cameraRef.current.position.set(-3.331, -0.201, 3.875)
  }, [])

  useEffect(() => {
    if(dialogIsCompleteTimeMachine) {
      gsap.to(cameraRef.current.rotation, {
        x: -0.743,
        y: -0.528,
        z: -0.433,
        duration: 4,
        delay: 2.5,
        ease: 'easeIn',
      })
      gsap.to(cameraRef.current.position, {
        // -3.010, -0.250, 3.441
        x: -3.010,
        y: -0.250,
        z: 3.441,
        duration: 4,
        delay: 2.5,
        ease: 'easeIn',
      })
    }
  }, [dialogIsCompleteTimeMachine])

  // useEffect(() => {
  //   if(dialogIsCompleteTimeMachine) {
  //     cameraRef.current.position.set(-3.331, -0.201, 3.875)
  //   }
  // }, [])

  // Responsiveness

  useEffect(() => {
    if(window.innerWidth < 768) {
      camera.position.set(-4.4, 0.26, 5)
    }
  }, [])

  return (
    <>
      <color args={['#241a1a']} attach='background' />

      <OrbitControls makeDefault enabled={false} />

      <Center position-y={-1}>
        <group scale={0.5} position={[-1.968, -0.499, 2.201]}>
          <BasicWorld />
          {/* Old Time Machine Text */}
          <BadgeText />

          {/* Displays */}
          <PlaceDisplay />
          <TargetDateDisplay />
          <CurrentDateDisplay />

          {/* Text from the machine */}
          <TextMachine />

          {/* Date Controls */}
          <DateControlHandler />

          {/* Shifter */}
          <Shifter />
        </group>

        {/* Environment */}
        <Garage />
        {/* <Boxes /> */}
        <TextSign />
      </Center>
    </>
  )
}

export default TimeMachineExperience
