import { Dispatch, SetStateAction, useEffect } from 'react'
import { Center } from '@react-three/drei'
import BasicWorld from './bedroomExperience/world/BasicWorld'
import CameraAnimation from './bedroomExperience/utils/CameraAnimation'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { getBgColorByHour } from './bedroomExperience/utils/LightsPerHour'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

interface BedroomExperienceProps {
  setCamera: Dispatch<SetStateAction<THREE.Camera>>
}

const BedroomExperience = ({ setCamera }: BedroomExperienceProps) => {
  const hourSelected = useSelector<RootState>((state) => state.date.hour) as number
  const bgColor: string = getBgColorByHour(hourSelected)
  const { camera } = useThree()

  useEffect(() => {
    setCamera(camera)
  }, [camera])

  return (
    <>
      <color args={[bgColor]} attach='background' />

      <Center>
        <BasicWorld />
      </Center>

      {/* <Effect /> */}
      <CameraAnimation />
    </>
  )
}

export default BedroomExperience
