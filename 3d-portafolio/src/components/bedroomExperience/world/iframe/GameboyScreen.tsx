import { useThree } from '@react-three/fiber'
import { useState, useRef, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as THREE from 'three'
import { RootState, animationsBedroomActions, helperActions } from '../../../../store'
import { gsap } from 'gsap'
import GameBoyControls from './GameBoyControls'
import { ObjectsToFocus } from '../../../../store/bedroomSlices/animation-slice'
import { GameScreen } from '../../../shared/html/GameScreen'
import { isMobileOrTablet } from '../../../shared/utils/ResponsiveCheck'
import { Html } from '@react-three/drei'

const GameboyScreen = () => {
  const [isEnterPlaying, setIsEnterPlaying] = useState(false)
  const [showIframe, setShowIframe] = useState(false)
  const [hovered, setHovered] = useState(false)
  const gameboyRef = useRef<THREE.Mesh>(null!)
  const [htmlRef, setHtmlRef] = useState<HTMLIFrameElement>(null!)
  const htmlRefWeb = useRef<HTMLIFrameElement>(null!)
  const { camera, size } = useThree()
  const dispatch = useDispatch()
  const isFocusAnObject = useSelector<RootState>(
    (state) => state.animationBedroom.isFocusAnObject
  )
  const monitorScreen = useMemo(() => GameScreen.getInstance(), [GameScreen])

  const showIframeHandler = () => {
    setShowIframe(true)
  }

  useEffect(() => {
    if (showIframe) {
      setTimeout(() => {
        if (htmlRef) {
          htmlRef.click()
        }
      }, 500)
    }
  }, [showIframe])

  const mouseEnterAnimation = () => {
    if (
      camera.position.x !== -0.476 &&
      camera.position.y !== -0.5462 &&
      camera.position.z !== -0.095
    ) {
      setIsEnterPlaying(true)
      dispatch(animationsBedroomActions.setIsFocusAnObject(ObjectsToFocus.GAMEBOY))

      if (gameboyRef.current) {
        camera.lookAt(gameboyRef.current.position)
      }
      gsap.to(camera.position, {
        x: -0.476, //-0.485
        y: -0.5462,
        z: -0.095, //-0.105
        duration: 1.5,
        onComplete: () => {
          showIframeHandler()
          setTimeout(() => {
            gsap.set(camera.position, { x: -0.476, y: -0.5462, z: -0.095 })
          }, 100)
        },
      })
      gsap.to(camera.rotation, {
        x: -1.6,
        y: -0.01,
        z: -2.49,
        duration: 1.5,
      })

      setTimeout(() => {
        setIsEnterPlaying(false)
      }, 1500)
    }
  }

  const mouseLeaveAnimation = () => {
    // Fix to a weird glitch that this function execute when I'm focus other objects
    if (isFocusAnObject === ObjectsToFocus.GAMEBOY) {
      dispatch(animationsBedroomActions.setIsFocusAnObject(ObjectsToFocus.ALL))
      setShowIframe(false)
      gsap.to(camera.position, {
        x: -2.43,
        y: 0.72,
        z: 2.55,
        duration: 1.5,
      })
      gsap.to(camera.rotation, {
        x: -0.32,
        y: -0.74,
        z: -0.22,
        duration: 1.5,
      })

      setTimeout(() => {
        setIsEnterPlaying(false)
      }, 1500)
    }
  }

  const onMouseEnter = () => {
    if (!isEnterPlaying) {
      // Checking if the animation is not playing
      if (camera.position.x !== -0.476 && camera.position.y !== -0.5465) {
        mouseEnterAnimation()
      }
    }
  }

  const onMouseLeave = () => {
    if (!isEnterPlaying) {
      if (camera.position.x === -0.476 && camera.position.y === -0.5462) {
        mouseLeaveAnimation()
      }
    }
  }

  // Pointer handler

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  // Show the iframe screen

  useEffect(() => {
    if (showIframe) {
      dispatch(helperActions.setShowHelperGameConsole(true))
    }
    if (isMobileOrTablet()) {
      if (showIframe) {
        const ref = monitorScreen.mountIframe()
        if (ref) {
          setHtmlRef(ref)
        }
      } else {
        monitorScreen.unmountIframe()
      }
    }
  }, [showIframe])

  return (
    <>
      <group>
        {/* Whis will act as the device box */}
        <mesh
          ref={gameboyRef}
          rotation={[0, -0.94, 0]}
          position={[-0.36, 0.05, 0.75]}
          onClick={onMouseEnter}
          onPointerMissed={onMouseLeave}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <boxGeometry args={[0.09, 0.02, 0.07]} />
          <meshBasicMaterial opacity={0} transparent />
        </mesh>
        {showIframe && (
          <>
            {/* This is a fix for a bug that i get on chrome for desktop devices, where my snake game iframe, gets black and white */}
            {/* so if I use R3F drei, it won't get the bug, but using R3F drei in mobile is offset for mobile browser bar, so is better if I use  */}
            {/* CSS3DRender */}
            {!isMobileOrTablet() && (
              <Html
                transform
                distanceFactor={0.028}
                rotation={[-1.63, 0.02, -2.493]}
                position={[-0.347, -0.02, 0.767]}
              >
                <iframe
                  src='https://snake-game-portafolio.vercel.app/'
                  style={{ width: '800px', height: '700px', border: 'none', opacity: 0 }}
                  onLoad={() => {
                    // To avoid white flashes while is loading
                    const element = htmlRefWeb.current
                    if (element && element.style) {
                      element.style.opacity = '1'
                    }
                  }}
                  ref={htmlRefWeb}
                />
              </Html>
            )}
            <GameBoyControls iframe={isMobileOrTablet() ? htmlRef : htmlRefWeb} />
          </>
        )}
      </group>
    </>
  )
}

export default GameboyScreen
