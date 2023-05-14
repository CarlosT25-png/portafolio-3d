import { Canvas } from '@react-three/fiber'
import TimeMachineExperience from './TimeMachineExperience'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { Loader } from '@react-three/drei'
import BedroomExperience from './BedroomExperience'
import { ACESFilmicToneMapping, CineonToneMapping, sRGBEncoding } from 'three'
import IntroScreen from './shared/html/IntroScreen'

const IndexExperience = () => {
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')

  useEffect(() => {
    setWidth(`${window.innerWidth}px`)
    setHeight(`${window.innerHeight}px`)
  }, [])

  return (
    <>
      <Suspense fallback={null}>
        {/* <Canvas
          dpr={[1, 2]}
          gl={{
            antialias: true,
            toneMapping: ACESFilmicToneMapping,
            outputEncoding: sRGBEncoding,
            // toneMappingExposure: 1.75
          }}
          camera={{
            fov: 35,
            near: 0.1,
            far: 2000,
            position: [-4.8, -0.2, 5.2],
          }}
          style={{ width: width, height: height }}
          shadows
        >
          {/* <TimeMachineExperience /> */}
          {/* <BedroomExperience /> */}
        {/* </Canvas> */}
        <IntroScreen />
      </Suspense>
      <Loader />
    </>
  )
}

export default IndexExperience
