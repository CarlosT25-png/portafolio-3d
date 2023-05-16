import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef, useState } from 'react'
import * as THREE from 'three'

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
  const [ isClicked, setIsClicked ] = useState(false);
  const pcRef = useRef<THREE.Group>(null!)
  const { camera } = useThree()
  const model = useGLTF(
    '/models/bedroomScene/bedroom-draco.glb'
  ) as unknown as BedroomInterface

  // Debug

  const { rotationObj, positionObj } = useControls('cameraPos', {
    rotationObj: {
      value: [-0.31, -0.64, -0.19],
      step: 0.01,
      joystick: 'invertY',
    },
    positionObj: {
      value: [-4.24, 0.26, 4.76], //value: [-4.24, 0.26, 4.76],
      step: 0.01,
      joystick: 'invertY',
    },
  })

  useFrame(( state ) => {
    if(isClicked) {
      state.camera.lookAt(pcRef.current?.position)
      state.camera.position.lerp( new THREE.Vector3(1,1,1), 0.1 )
      state.camera.updateProjectionMatrix();
    }
  })

  const clickHandler = () => {
    console.log('click')
    // camera.position.set(model.nodes.monitor001.position.x, model.nodes.monitor001.position.y, model.nodes.monitor001.position.z)
  }

  // camera.lookAt(model.nodes.monitor001.position)
  // camera.position.set(...positionObj)
  // camera.rotation.set(...rotationObj)

  return (
    <group>
      {/* <primitive object={model.scene} /> */}
      <primitive object={model.nodes.scene001} />
      <primitive object={model.nodes.library} />
      <primitive object={model.nodes.periferics} />
      <group ref={ pcRef } onClick={() => {
        console.log('first')
        setIsClicked(!isClicked)
      }}>
        <primitive object={model.nodes.monitor001} />
      </group>
    </group>
  )
}

export default Structure
