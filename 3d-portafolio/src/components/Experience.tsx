import { Center, OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import { Perf } from 'r3f-perf'

const Experience = () => {

  const { nodes } = useGLTF('/timeMachine.glb');

  const bakedTexture = useTexture('/baked.jpg')
  bakedTexture.flipY = false;


  console.log(nodes)

  return (
    <>
      <Perf />
      <color args={ [ '#241a1a' ] } attach="background" />

      <OrbitControls makeDefault />

      <Center>
        <mesh geometry={ nodes.baked.geometry }>
          <meshBasicMaterial map={ bakedTexture } />
        </mesh>

        {/* <mesh 
                geometry={ nodes.poleLightA.geometry } 
                position={ nodes.poleLightA.position } 
            >
                <meshBasicMaterial color='#ffffe5' />        
        </mesh> */}

      </Center>
    </>
  );
}

export default Experience;