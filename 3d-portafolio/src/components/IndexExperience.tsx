import { ReactNode, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
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
import ExitView from './shared/html/ExitView'
import { ObjectsToFocus } from '../store/global/helperSlice'

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
  const [isStarted, setIsStarted] = useState(false) // DEBUG
  const [videoTransitionConfirm, setVideoTransitionConfirm] = useState(false)
  const [camera, setCamera] = useState<THREE.Camera>(null!)
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
  // Exit view
  const objectToFocus = useSelector<RootState>(
    (state) => state.animationBedroom.isFocusAnObject
  ) as ObjectsToFocus

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
            // @ts-ignore
            outputColorSpace: SRGBColorSpace,
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
          {scene === scenes.BEDROOM && <BedroomExperience setCamera={setCamera} />}
          <Preload all />
        </Canvas>
        {scene === scenes.TIMEMACHINE &&
          isStarted &&
          isReadyToPlayDialogTimeMachine &&
          !dialogIsCompleteTimeMachine && <TimeMachineDialogs />}
        {scene === scenes.BEDROOM && !dialogIsCompleteBedroom && <BedroomDialog />}
        {scene === scenes.BEDROOM && objectToFocus === ObjectsToFocus.DESKTOP && (
          <InfoHelper onCompleteUpdate={helperActions.setMonitorHelperHasShown}>
            {'Use the PC to access my information and contact me :)'}
          </InfoHelper>
        )}
        {scene === scenes.BEDROOM && objectToFocus === ObjectsToFocus.GAMEBOY && (
          <InfoHelper onCompleteUpdate={helperActions.setGameConsoleHelperHasShown}>
            {'To play, use the physical buttons of the game console or the arrow keys on your keyboard.'} 
          </InfoHelper>
        )}
        {scene === scenes.BEDROOM && objectToFocus === ObjectsToFocus.PICTURES && (
          <InfoHelper onCompleteUpdate={helperActions.setPolaroidsHelperHasShown}>
            {'Click on the pictures to visit their websites'}
          </InfoHelper>
        )}
        {/* Exit view button */}
        {objectToFocus !== ObjectsToFocus.ALL && <ExitView camera={camera} />}
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
