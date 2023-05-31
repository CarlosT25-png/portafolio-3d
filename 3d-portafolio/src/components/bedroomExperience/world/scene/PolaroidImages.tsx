import { Image, Text } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as THREE from 'three'
import { animationsBedroomActions } from '../../../../store'
import { gsap } from 'gsap'

const INDIE_FONT_URL = '/fonts/indie-flower-v17-latin-regular.woff'
const PANGOLIN_FONT_URL = '/fonts/pangolin-v11-latin-regular.woff'

const PolaroidImages = () => {
  const [isEnterPlaying, setIsEnterPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [showLinks, setShowLinks] = useState(false)
  const picturesRef = useRef<THREE.Mesh>(null!)
  const { camera } = useThree()
  const dispatch = useDispatch()

  const mouseEnterAnimation = () => {
    setIsEnterPlaying(true)
    dispatch(animationsBedroomActions.setIsFocusAnObject(true))

    if (picturesRef.current) {
      camera.lookAt(picturesRef.current.position)
    }
    gsap.to(camera.position, {
      x: 0.4,
      y: 0.125,
      z: -0.3147,
      duration: 1.5,
      onComplete: () => setShowLinks(true),
    })
    gsap.to(camera.rotation, {
      // -1.60,-0.01,-2.49
      x: -1.3278,
      y: -1.557,
      z: -1.3278,
      duration: 1.5,
    })

    setTimeout(() => {
      setIsEnterPlaying(false)
    }, 1500)
  }

  const mouseLeaveAnimation = () => {
    dispatch(animationsBedroomActions.setIsFocusAnObject(false))
    setShowLinks(false)
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

  const onMouseEnter = () => {
    if (!isEnterPlaying) {
      if (camera.position.x !== 0.1 && camera.position.y !== 0.158) {
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

  const externalLinkHandler = (url: string) => {
    if (showLinks) {
      window.open(url, '_blank')!.focus()
    } else {
      onMouseEnter()
    }
  }

  return (
    <>
      <group>
        {/* Whis will act as the device box */}
        <mesh
          ref={picturesRef}
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[1.06, 0.82, 0.525]}
          onClick={onMouseEnter}
          onPointerMissed={onMouseLeave}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <planeGeometry args={[0.37, 0.28]} />
          <meshBasicMaterial color={'#eeeeee'} opacity={0} transparent />
        </mesh>

        {/* Special Thanks */}
        {showLinks && (
          <Text
            font={PANGOLIN_FONT_URL}
            rotation={[0, -Math.PI * 0.5, 0]}
            position={[1.065, 0.95, 0.515]}
            scale={0.015}
            maxWidth={7}
            color={'black'}
          >
            Special Thanks
          </Text>
        )}

        {/* Threejs Journey */}
        <Image
          url='/images/bedroom/polaroidPictures/three-js-journey.jpg'
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[1.072, 0.904, 0.3965]}
          scale-y={0.066}
          scale-x={0.076}
          onClick={() => externalLinkHandler('https://threejs-journey.com/')}
        />
        <Text
          font={INDIE_FONT_URL}
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[1.065, 0.85, 0.3965]}
          scale={0.007}
          maxWidth={8}
          color={'black'}
        >
          ThreeJs Journey The best ThreeJs and R3F out there
        </Text>

        {/* Marianne Gallo */}
        <Image
          url='/images/bedroom/polaroidPictures/attic.jpg'
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[1.072, 0.875, 0.538]}
          scale-y={0.042}
          scale-x={0.074}
          onClick={() =>
            externalLinkHandler('https://www.linkedin.com/in/marianne-gallo/')
          }
        />
        <Image
          url='/images/bedroom/polaroidPictures/bedroom.jpg'
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[1.072, 0.817, 0.4905]}
          scale-y={0.066}
          scale-x={0.076}
          onClick={() =>
            externalLinkHandler('https://www.linkedin.com/in/marianne-gallo/')
          }
        />
        <Text
          font={INDIE_FONT_URL}
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[1.064, 0.758, 0.4905]}
          scale={0.0058}
          maxWidth={8}
          color={'black'}
        >
          Marianne Gallo Thanks for the beatiful interior design of my bedroom and attic
        </Text>

        {/* Academind */}
        <Image
          url='/images/bedroom/polaroidPictures/academind.jpg'
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[1.072, 0.76, 0.5815]}
          scale-y={0.066}
          scale-x={0.076}
          onClick={() => externalLinkHandler('https://academind.com')}
        />
        <Text
          font={INDIE_FONT_URL}
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[1.065, 0.7, 0.5815]}
          scale={0.0072}
          maxWidth={8}
          color={'black'}
        >
          Academind - Thanks for the best react courses out there
        </Text>

        {/* Poly */}
        <Image
          url='/images/bedroom/polaroidPictures/poly.jpg'
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[1.072, 0.931, 0.638]}
          scale-y={0.066}
          scale-x={0.076}
          onClick={() => externalLinkHandler('https://academind.com')}
        />
        <Text
          font={INDIE_FONT_URL}
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[1.065, 0.87, 0.636]}
          scale={0.0059}
          maxWidth={7}
          color={'black'}
        >
          Poly Pizza I use a lot of their 3d models and I love it
        </Text>
      </group>
    </>
  )
}

export default PolaroidImages