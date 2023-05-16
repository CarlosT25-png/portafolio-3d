import { useLayoutEffect, useRef, useState } from 'react'
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
      value: [0.038442, -0.7450511, 0.026071],
      step: 0.01,
      joystick: 'invertY',
    },
    positionObj: {
      value: [-4.8, -0.2, 5.2], //value: [-4.24, 0.26, 4.76],
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
    // camera.position.set( 0.59, -0.24, -0.4125 ) //...positionObj
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
    // camera.rotation.set( -1.13, -1.51, -1.13) //...rotationObj

    setTimeout(() => {
      setIsEnterPlaying(false)
    }, 1500)
  
  }

  const mouseLeaveAnimation = () => {
    camera.lookAt(new THREE.Vector3())
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
    if(!isEnterPlaying){
      mouseEnterAnimation()
    }
  }

  const onMouseLeave = () => {
    if(!isEnterPlaying){
      mouseLeaveAnimation()
    }
  }

  return (
    <group>
      {/* <primitive object={model.scene} /> */}
      <primitive object={model.nodes.scene001} />
      <primitive object={model.nodes.library} />
      <primitive object={model.nodes.periferics} />
      <group ref={pcRef} onPointerEnter={onMouseEnter} onPointerLeave={onMouseLeave}>
        <primitive object={model.nodes.monitor001} />
      </group>
    </group>
  )
}

export default Structure
