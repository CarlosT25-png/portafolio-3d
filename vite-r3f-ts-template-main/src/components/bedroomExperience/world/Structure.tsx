import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useControls } from 'leva'
import gsap from 'gsap'

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

const Structure = () => {
  const [ isEnterPlaying , setIsEnterPlaying ] = useState(false)
  const pcRef = useRef<THREE.Group>(null!)
  const { camera, controls } = useThree()
  const model = useGLTF(
    '/models/bedroomScene/bedroom-draco.glb'
  ) as unknown as BedroomInterface

  // Debug

  const { rotationObj, positionObj } = useControls('cameraPos', {
    rotationObj: {
      value: [0, -Math.PI * 0.5, 0],
      step: 0.01,
      joystick: 'invertY',
    },
    positionObj: {
      value: [0.89, 0.46, 0.4275], //value: [-4.24, 0.26, 4.76],
      step: 0.01,
      joystick: 'invertY',
    },
  })

  useLayoutEffect(() => {
    camera.position.set(-2.43, 0.72, 2.55)
    camera.rotation.set(-0.32, -0.74, -0.22)
  }, [])

  const mouseEnterAnimation = () => {
    setIsEnterPlaying(true)
    camera.lookAt(model.nodes.monitor001.position)
    gsap.to(camera.position, {
      x: 0.59,
      y: -0.24,
      z: -0.4125,
      duration: 1.5,
    })
    gsap.to(camera.rotation, {
      x: -1.13,
      y: -1.51,
      z: -1.13,
      duration: 1.5,
    })

    setTimeout(() => {
      setIsEnterPlaying(false)
    }, 1500)
  
  }

  const mouseLeaveAnimation = () => {
    // camera.position.set( -2.43, 0.72, 2.55 ) //...positionObj
    // camera.rotation.set( -0.32, -0.74, -0.22 ) //...rotationObj
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
    if(!isEnterPlaying){ // Checking if the animation is not playing
      if(camera.position.x !== 0.59 && camera.position.y !== -0.24)
      {
        mouseEnterAnimation()
      }
    }
  }

  const onMouseLeave = () => {
    if(!isEnterPlaying){
      mouseLeaveAnimation()
    }
  }

  // onPointerEnter={onMouseEnter} onPointerLeave={onMouseLeave}

  return (
    <group>
      {/* <primitive object={model.scene} /> */}
      <primitive object={model.nodes.scene001} />
      <primitive object={model.nodes.library} />
      <primitive object={model.nodes.periferics} />
      <group ref={pcRef} onClick={onMouseEnter} onPointerMissed={onMouseLeave}>
        <primitive object={model.nodes.monitor001} />
      </group>
      {/* This will act as the real screen */}
      <mesh rotation={[ -1.56, -1.23, -1.56]} position={[0.89, 0.46, 0.4275]}>
        <planeGeometry args={[0.12, 0.092]} />
        <meshBasicMaterial color={'yellow'} />
      </mesh>
    </group>
  )
}

export default Structure
