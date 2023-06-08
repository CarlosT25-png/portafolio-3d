import { Html, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { Glitch, EffectComposer, Select, Selection } from '@react-three/postprocessing'
import { GlitchMode } from 'postprocessing'
import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, animationsBedroomActions } from '../../../../store'
import { ObjectsToFocus } from '../../../../store/bedroomSlices/animation-slice'
import { useControls } from 'leva'

interface BedroomInterface {
  nodes: {
    scene001: THREE.Group
    library: THREE.Mesh
    monitor001: THREE.Group
    periferics: THREE.Group
    lightOn: {
      geometry: THREE.BufferGeometry
      position: THREE.Vector3
    }
  }
}

const Screen = () => {
  const [isEnterPlaying, setIsEnterPlaying] = useState(false)
  const [showIframe, setShowIframe] = useState(false)
  const [hovered, setHovered] = useState(false)
  const pcRef = useRef<THREE.Group>(null!)
  const screenRef = useRef<THREE.Mesh>(null!)
  const htmlRef = useRef<HTMLIFrameElement>(null)
  const { camera, controls } = useThree()
  const dispatch = useDispatch()
  const isFocusAnObject = useSelector<RootState>(
    (state) => state.animationBedroom.isFocusAnObject
  )

  const model = useGLTF(
    '/models/bedroomScene/bedroom-draco.glb'
  ) as unknown as BedroomInterface

  useLayoutEffect(() => {
    camera.position.set(-2.43, 0.72, 2.55)
    camera.rotation.set(-0.32, -0.74, -0.22)
  }, [])

  const showIframeHandler = () => {
    setShowIframe(true)
  }

  const mouseEnterAnimation = () => {
    setIsEnterPlaying(true)
    dispatch(animationsBedroomActions.setIsFocusAnObject(ObjectsToFocus.DESKTOP))

    camera.lookAt(model.nodes.monitor001.position)
    gsap.to(camera.position, {
      x: 0.56,
      y: -0.21,
      z: -0.4125,
      duration: 1.5,
      onComplete: () => showIframeHandler(),
    })
    gsap.to(camera.rotation, {
      x: -1.45,
      y: -1.4,
      z: -1.45,
      duration: 1.5,
    })

    setTimeout(() => {
      setIsEnterPlaying(false)
    }, 1500)
  }

  const mouseLeaveAnimation = () => {
    // Fix to a weid glitch that this function execute when I'm focus other objects
    if (isFocusAnObject === ObjectsToFocus.DESKTOP) {
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
      if (camera.position.x !== 0.59 && camera.position.y !== -0.24) {
        mouseEnterAnimation()
      }
    }
  }

  const onMouseLeave = () => {
    if (!isEnterPlaying) {
      mouseLeaveAnimation()
    }
  }

  // Pointer handler

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  return (
    <>
      <group
        ref={pcRef}
        onClick={onMouseEnter}
        onPointerMissed={onMouseLeave}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <primitive object={model.nodes.monitor001} />
      </group>
      {/* This will act as the real screen */}
      <group>
        <mesh
          ref={screenRef}
          rotation={[-1.51, -1.22, -1.51]}
          position={[0.89, 0.46, 0.43]}
        >
          <planeGeometry args={[0.118, 0.0915]} />
          <meshBasicMaterial color={'#000000'} /> {/*5c5c5c */}
        </mesh>
        {showIframe && (
          <Html
            transform
            distanceFactor={0.106}
            rotation={[-1.56, -1.29, -1.56]}
            position={[1.17, 0.402, 0.423]}
          >
            <iframe
              src='https://inner-portafolio.vercel.app/'
              style={{
                width: '1000px',
                height: '750px',
                border: 'none',
                opacity: 0,
                backgroundColor: 'black',
              }}
              onLoad={() => {
                // To avoid white flashes while is loading
                const element = htmlRef.current
                if (element && element.style) {
                  element.style.opacity = '1'
                }
              }}
              ref={htmlRef}
            />
          </Html>
        )}
      </group>
    </>
  )
}

export default Screen
