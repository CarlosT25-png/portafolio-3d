import { Html, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useState, useRef, useLayoutEffect, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, animationsBedroomActions, helperActions } from '../../../../store'
import { ObjectsToFocus } from '../../../../store/bedroomSlices/animation-slice'
import { MonitorScreen } from '../../../shared/html/MonitorScreen'

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
  const { camera } = useThree()
  const dispatch = useDispatch()
  const isFocusAnObject = useSelector<RootState>(
    (state) => state.animationBedroom.isFocusAnObject
  )
  const monitorScreen = useMemo(() => MonitorScreen.getInstance(), [MonitorScreen])

  const model = useGLTF(
    '/models/bedroomScene/bedroom-draco.glb'
  ) as unknown as BedroomInterface

  useEffect(() => {
    camera.position.set(-2.43, 0.72, 2.55)
    camera.rotation.set(-0.32, -0.74, -0.22)
  }, [])

  const showIframeHandler = () => {
    setShowIframe(true)
  }

  const mouseEnterAnimation = () => {
    if (
      camera.position.x !== 0.56 &&
      camera.position.y !== -0.21 &&
      camera.position.z !== -0.4125
    ) {
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
  }

  const onMouseEnter = () => {
    if (!isEnterPlaying) {
      // Checking if the animation is not playing
      if (camera.position.x !== 0.59 && camera.position.y !== -0.24) {
        mouseEnterAnimation()
      }
    }
  }

  // Pointer handler

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  // Check for exit view btn

  useEffect(() => {
    if (isFocusAnObject === ObjectsToFocus.DESKTOP) {
      setTimeout(() => {
        setShowIframe(true)
      }, 1500)
    } else if (isFocusAnObject === ObjectsToFocus.ALL) {
      setShowIframe(false)
    }
  }, [isFocusAnObject])

  // Show Iframe

  useEffect(() => {
    if (showIframe) {
      monitorScreen.mountIframe()
      dispatch(helperActions.setShowHelperMonitor(true))
    } else {
      monitorScreen.unmountIframe()
    }
  }, [showIframe])

  return (
    <>
      {/* Spotlight */}
      {isFocusAnObject === ObjectsToFocus.ALL && (
        <spotLight
          angle={Math.PI / 49}
          color={'#fffcbe'}
          distance={5}
          decay={0.4}
          penumbra={0.9}
          power={4}
          position={[-2.94, 1.95, 2.34]}
        />
      )}

      <group
        ref={pcRef}
        onClick={onMouseEnter}
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
          <meshBasicMaterial color={'#000000'} />
        </mesh>
      </group>
    </>
  )
}

export default Screen
