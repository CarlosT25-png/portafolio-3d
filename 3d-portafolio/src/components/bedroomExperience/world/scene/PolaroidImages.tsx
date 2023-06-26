import { Image, Text } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as THREE from 'three'
import { RootState, animationsBedroomActions, helperActions } from '../../../../store'
import { gsap } from 'gsap'
import { ObjectsToFocus } from '../../../../store/bedroomSlices/animation-slice'
import { isMobileOrTablet } from '../../../shared/utils/ResponsiveCheck'

const INDIE_FONT_URL = '/fonts/indie-flower-v17-latin-regular.woff'
const PANGOLIN_FONT_URL = '/fonts/pangolin-v11-latin-regular.woff'

const PolaroidImages = () => {
  const [isEnterPlaying, setIsEnterPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [showLinks, setShowLinks] = useState(false)
  const picturesRef = useRef<THREE.Mesh>(null!)
  const specialThanksTextRef = useRef(null)
  const { camera } = useThree()
  const dispatch = useDispatch()
  const isFocusAnObject = useSelector<RootState>(
    (state) => state.animationBedroom.isFocusAnObject
  )

  const mouseEnterAnimation = () => {
    setIsEnterPlaying(true)
    dispatch(animationsBedroomActions.setIsFocusAnObject(ObjectsToFocus.PICTURES))

    if (picturesRef.current) {
      camera.lookAt(picturesRef.current.position)
    }

    const isMobOrTab = isMobileOrTablet() //isMobileOrTablet()
    gsap.to(camera.position, {
      x: isMobOrTab ? 0.25 : 0.4,
      y: 0.125,
      z: isMobOrTab ? -0.33 : -0.3147,
      duration: 1.5,
      onComplete: () => {
        setShowLinks(true)
        setTimeout(() => {
          gsap.set(camera.position, {
            x: isMobOrTab ? 0.25001 : 0.4001,
            y: 0.125,
            z: isMobOrTab ? -0.33001 : -0.31471,
          })
          gsap.set(camera.rotation, {
            x: -1.3278,
            y: -1.557,
            z: -1.3278,
          })
        }, 300)
      },
    })
    gsap.to(camera.rotation, {
      x: -1.3278,
      y: -1.557,
      z: -1.3278,
      duration: 1.5,
    })

    setTimeout(() => {
      setIsEnterPlaying(false)
    }, 1500)
  }


  const onMouseEnter = () => {
    if (!isEnterPlaying) {
      if (isFocusAnObject === ObjectsToFocus.ALL) {
        mouseEnterAnimation()
      }
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

  // Check for exit view btn

  useEffect(() => {
    if(isFocusAnObject === ObjectsToFocus.PICTURES){
      setTimeout(() => {
        setShowLinks(true) 
      }, 1500)
    } else if(isFocusAnObject === ObjectsToFocus.ALL) {
      setShowLinks(false)
    }
  }, [isFocusAnObject])


  // Effect for special thanks text
  useEffect(() => {
    if (showLinks) {
      dispatch(helperActions.setShowHelperPolaroids(true))
      gsap.to(specialThanksTextRef.current, {
        fillOpacity: 1,
        duration: 1,
      })
    }
  }, [showLinks])

  return (
    <>
      <group>
        {/* Whis will act as the device box */}
        <mesh
          ref={picturesRef}
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[1.06, 0.82, 0.525]}
          onClick={onMouseEnter}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <planeGeometry args={[0.37, 0.28]} />
          <meshBasicMaterial color={'#eeeeee'} opacity={0} transparent />
        </mesh>

        {/* Special Thanks */}
        {showLinks && (
          <Text
            ref={specialThanksTextRef}
            font={PANGOLIN_FONT_URL}
            rotation={[0, -Math.PI * 0.5, 0]}
            position={[1.065, 0.95, 0.515]}
            scale={0.015}
            maxWidth={7}
            color={'black'}
            fillOpacity={0}
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
          position={[1.05, 0.835, 0.4]}
          scale={0.007}
          maxWidth={8}
          lineHeight={1.4}
          color={'black'}
        >
          ThreeJs Journey: Amazing course for mastering Three.js, It really help me out,
          Highly recommended!
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
          url='/images/bedroom/polaroidPictures/hola-beats.jpg'
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[1.072, 0.76, 0.5815]}
          scale-y={0.066}
          scale-x={0.076}
          onClick={() =>
            externalLinkHandler('https://open.spotify.com/artist/7CvWoscqVQJvqb0OcBRQO7')
          }
        />
        <Text
          font={INDIE_FONT_URL}
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[1.059, 0.698, 0.58]}
          scale={0.0072}
          maxWidth={8}
          color={'black'}
        >
          Hola Beats, these are definitely my favorite lo-fi songs, and they are free to
          use in any of your projects :)
        </Text>

        {/* Poly */}
        <Image
          url='/images/bedroom/polaroidPictures/poly.jpg'
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[1.072, 0.931, 0.638]}
          scale-y={0.066}
          scale-x={0.076}
          onClick={() => externalLinkHandler('https://poly.pizza/')}
        />
        <Text
          font={INDIE_FONT_URL}
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[1.065, 0.87, 0.636]}
          scale={0.0059}
          maxWidth={7}
          lineHeight={1.2}
          color={'black'}
        >
          Poly Pizza is an amazing 3D library, with excellent models and great
          performance.
        </Text>
      </group>
    </>
  )
}

export default PolaroidImages
