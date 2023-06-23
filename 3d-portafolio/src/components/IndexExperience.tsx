import { ReactNode, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ACESFilmicToneMapping, sRGBEncoding } from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Loader, Preload } from '@react-three/drei'
import { useSelector } from 'react-redux'
import TimeMachineExperience from './TimeMachineExperience'
import BedroomExperience from './BedroomExperience'
import IntroScreen from './shared/html/IntroScreen'
import { RootState, helperActions } from '../store'
import { scenes } from '../store/global/globalConfigSlice'
import TimeTravelVideoPlayer from './shared/transitions/TimeTravelVideoPlayer'
import TimeMachineDialogs from './shared/messageDialogs/TimeMachineDialogs'
import BedroomDialog from './shared/messageDialogs/BedroomDialog'
import ConfirmTravel from './shared/html/ConfirmTravel'
import { isMobileOrTablet } from './shared/utils/ResponsiveCheck'
import InfoHelper from './bedroomExperience/world/helper/InfoHelper'

const TEXT_HELPER = 'To exit this view, click outside the '

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
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isStarted, setIsStarted] = useState(true) // DEBUG
  const [videoTransitionConfirm, setVideoTransitionConfirm] = useState(false)
  const scene = useSelector<RootState>((state) => state.globalConfig.scene) as scenes
  // Dialogs
  const isReadyToPlayDialogTimeMachine = useSelector<RootState>(
    (state) => state.globalConfig.isReadyToPlayDialogTimeMachine
  ) as boolean
  const dialogIsCompleteTimeMachine = useSelector<RootState>(
    (state) => state.globalConfig.dialogIsCompleteTimeMachine
  ) as boolean
  const dialogIsCompleteBedroom = useSelector<RootState>(
    (state) => state.globalConfig.dialogIsCompleteBedroom
  ) as boolean
  // Helper info
  const showHelperMonitor = useSelector<RootState>(
    (state) => state.helper.showHelperMonitor
  ) as boolean
  const monitorHelperHasShown = useSelector<RootState>(
    (state) => state.helper.monitorHelperHasShown
  ) as boolean
  const showHelperGameConsole = useSelector<RootState>(
    (state) => state.helper.showHelperGameConsole
  ) as boolean
  const gameConsoleHelperHasShown = useSelector<RootState>(
    (state) => state.helper.gameConsoleHelperHasShown
  ) as boolean
  const showHelperPolaroids = useSelector<RootState>(
    (state) => state.helper.showHelperPolaroids
  ) as boolean
  const polaroidsHelperHasShown = useSelector<RootState>(
    (state) => state.helper.polaroidsHelperHasShown
  ) as boolean

  let content: ReactNode

  if (scene !== scenes.TRANSITION) {
    content = (
      <>
        {!isStarted && <IntroScreen onStart={setIsStarted} />}{' '}
        {/* <IntroScreen onStart={setIsStarted} /> */}
        <Canvas
          dpr={[1, 2]}
          gl={{
            antialias: true,
            toneMapping: ACESFilmicToneMapping,
            outputEncoding: sRGBEncoding,
            alpha: true,
            toneMappingExposure: 0.9,
          }}
          camera={{
            fov: window.innerWidth < 768 ? 50 : 35,
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
        {scene === scenes.TIMEMACHINE &&
          isStarted &&
          isReadyToPlayDialogTimeMachine &&
          !dialogIsCompleteTimeMachine && <TimeMachineDialogs />}
        {scene === scenes.BEDROOM && !dialogIsCompleteBedroom && <BedroomDialog />}
        {scene === scenes.BEDROOM && showHelperMonitor && !monitorHelperHasShown && (
          <InfoHelper onCompleteUpdate={helperActions.setMonitorHelperHasShown}>
            {TEXT_HELPER + 'monitor'}
          </InfoHelper>
        )}
        {scene === scenes.BEDROOM && showHelperGameConsole && !gameConsoleHelperHasShown && (
          <InfoHelper onCompleteUpdate={helperActions.setGameConsoleHelperHasShown}>
            {TEXT_HELPER + 'game console'}
          </InfoHelper>
        )}
        {scene === scenes.BEDROOM && showHelperPolaroids && !polaroidsHelperHasShown && (
          <InfoHelper onCompleteUpdate={helperActions.setPolaroidsHelperHasShown}>
            {TEXT_HELPER + 'pictures'}
          </InfoHelper>
        )}
      </>
    )
  } else if (scene === scenes.TRANSITION) {
    content = (
      <>
        {isMobileOrTablet() && !videoTransitionConfirm && (
          <ConfirmTravel
            onConfirm={() => {
              videoRef.current?.play()
              setVideoTransitionConfirm(true)
            }}
          />
        )}
        <TimeTravelVideoPlayer ref={videoRef} />
      </>
    )
  }

  return (
    <>
      <Suspense fallback={null}>{content}</Suspense>
      <Loader />
    </>
  )
}

export default IndexExperience
