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
import SoundEffects from './timeMachineScene/world/SoundEffects'
import { RootState } from '../store'

const TimeMachineExperience = () => {
  const dialogIsCompleteTimeMachine = useSelector<RootState>((state) => state.globalConfig.dialogIsCompleteTimeMachine) as boolean
  const { camera } = useThree()

  const cameraRef = useRef(camera)

  // Animations

  useLayoutEffect(() => {
    // Setting camer position
    cameraRef.current.rotation.set(-0.31, -0.64, -0.19)
    cameraRef.current.position.set(-4.24, 0.26, 4.76)
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
    }
  }, [dialogIsCompleteTimeMachine])

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
        <group scale={0.5} position-y={-0.5}>
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
        <Boxes />
        <TextSign />

        {/* Sounds */}
        <SoundEffects
          fixedSoundUrl='/sounds/timeMachineScene/machine.mp3'
          randomSoundUrl='/sounds/timeMachineScene/electric.mp3'
        />
      </Center>
    </>
  )
}

export default TimeMachineExperience
