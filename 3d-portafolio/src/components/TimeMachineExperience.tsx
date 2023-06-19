import { useEffect, useLayoutEffect, useRef } from 'react'
import { Center, OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useSelector } from 'react-redux'
import BadgeText from './timeMachineScene/BadgeText'
import PlaceDisplay from './timeMachineScene/displays/PlaceDisplay'
import TargetDateDisplay from './timeMachineScene/displays/TargetDateDisplay'
import CurrentDateDisplay from './timeMachineScene/displays/CurrentDateDisplay'
import DateControlHandler from './timeMachineScene/controls/dateControls/DateControlHandler'
import TextMachine from './timeMachineScene/displays/TextMachine'
import BasicWorld from './timeMachineScene/world/BasicWorld'
import Garage from './timeMachineScene/world/garage/Garage'
import TextSign from './timeMachineScene/world/garage/TextSign'
import { gsap } from 'gsap'
import Shifter from './timeMachineScene/controls/shifter/Shifter'
import { RootState } from '../store'
import {  isMobileOrTablet, isTablet } from './shared/utils/ResponsiveCheck'

const TimeMachineExperience = () => {
  const dialogIsCompleteTimeMachine = useSelector<RootState>((state) => state.globalConfig.dialogIsCompleteTimeMachine) as boolean
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
      if(isTablet()){
        gsap.to(cameraRef.current.position, {
          x: -3.41,
          y: 0.3,
          z: 4,
          duration: 4,
          delay: 2.5,
          ease: 'easeIn',
        })
      } else {
        gsap.to(cameraRef.current.position, {
          x: -3.25,
          y: 0.3,
          z: 3.8,
          duration: 4,
          delay: 2.5,
          ease: 'easeIn',
        })
      }

    }
  }, [dialogIsCompleteTimeMachine])

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
