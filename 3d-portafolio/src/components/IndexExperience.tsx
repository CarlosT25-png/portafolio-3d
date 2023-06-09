import { ReactNode, Suspense, useLayoutEffect, useState } from 'react'
import { ACESFilmicToneMapping, sRGBEncoding } from 'three'
import { Canvas } from '@react-three/fiber'
import { Loader, Preload } from '@react-three/drei'
import { useSelector } from 'react-redux'
import TimeMachineExperience from './TimeMachineExperience'
import BedroomExperience from './BedroomExperience'
import IntroScreen from './shared/html/IntroScreen'
import { RootState } from '../store'
import { scenes } from '../store/global/globalConfigSlice'
import TimeTravelVideoPlayer from './shared/transitions/TimeTravelVideoPlayer'
import TimeMachineDialogs from './shared/messageDialogs/TimeMachineDialogs'

// Hook to handle window resize
function useWindowSize() {
  const [sizes, setSizes] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize() {
      setSizes([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return sizes
}

const IndexExperience = () => {
  const [widthR, heightR] = useWindowSize()
  const [isStarted, setIsStarted] = useState(false) // DEBUG
  const scene = useSelector<RootState>((state) => state.globalConfig.scene) as scenes
  const isReadyToPlayDialogTimeMachine = useSelector<RootState>(
    (state) => state.globalConfig.isReadyToPlayDialogTimeMachine
  ) as boolean
  const dialogIsCompleteTimeMachine = useSelector<RootState>(
    (state) => state.globalConfig.dialogIsCompleteTimeMachine
  ) as boolean

  let content: ReactNode

  if (scene !== scenes.TRANSITION) {
    content = (
      <>
        {!isStarted && <IntroScreen onStart={setIsStarted} />}
        <Canvas
          dpr={[1, 2]}
          gl={{
            antialias: true,
            toneMapping: ACESFilmicToneMapping,
            outputEncoding: sRGBEncoding,
            alpha: true,
            // toneMappingExposure: 1.75
          }}
          camera={{
            fov: window.innerWidth < 768 ? 45 : 35,
            near: 0.1,
            far: 2000,
            position: [-4.8, -0.2, 5.2],
          }}
          style={{ width: widthR, height: heightR }}
          shadows
        >
          {scene === scenes.TIMEMACHINE && <TimeMachineExperience />}
          {scene === scenes.BEDROOM && <BedroomExperience />}
          <Preload all />
        </Canvas>
        {scene === scenes.TIMEMACHINE && isStarted &&
          isReadyToPlayDialogTimeMachine &&
          !dialogIsCompleteTimeMachine && <TimeMachineDialogs />}
      </>
    )
  } else if (scene === scenes.TRANSITION) {
    content = <TimeTravelVideoPlayer />
  }

  return (
    <>
      <Suspense fallback={null}>{content}</Suspense>
      <Loader />
    </>
  )
}

export default IndexExperience
