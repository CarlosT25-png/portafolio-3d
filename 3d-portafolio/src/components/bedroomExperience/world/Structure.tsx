import { useGLTF } from '@react-three/drei'
import Screen from './iframe/Screen'
import GameboyScreen from './iframe/GameboyScreen'

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

  const model = useGLTF(
    '/models/bedroomScene/bedroom-draco.glb'
  ) as unknown as BedroomInterface

  return (
    <group>
      {/* <primitive object={model.scene} /> */}
      <primitive object={model.nodes.scene001} />
      <primitive object={model.nodes.library} />
      <primitive object={model.nodes.periferics} />
      <Screen />
      <GameboyScreen />
    </group>
  )
}

export default Structure
