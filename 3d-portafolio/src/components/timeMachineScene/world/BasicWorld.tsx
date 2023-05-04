import { Clone, Environment, useGLTF, useTexture } from "@react-three/drei";
import { useRef } from "react";
import Garage from "./garage/Garage";

interface timeMachineInterface {
  nodes: {
    baked: {
      geometry: THREE.BufferGeometry;
    };
    lightTravel: {
      geometry: THREE.BufferGeometry;
      position: THREE.Vector3;
    };
    lightOn: {
      geometry: THREE.BufferGeometry;
      position: THREE.Vector3;
    };
  };
}

const BasicWorld = () => {

  const ref = useRef<THREE.Group>(null);
  const { nodes } = useGLTF(
    "/timeMachine.glb"
  ) as unknown as timeMachineInterface;

  const bakedTexture = useTexture("/baked.jpg");
  bakedTexture.flipY = false;

  return (
    <>
      <group ref={ref} rotation-y={-2.24}>
          {/* Base Scene */}
          <group castShadow>
            <mesh geometry={nodes.baked.geometry} castShadow>
              <meshBasicMaterial map={bakedTexture} />
            </mesh>

            <mesh
              geometry={nodes.lightOn.geometry}
              position={[
                nodes.lightOn.position.x - 0.045,
                nodes.lightOn.position.y - 0.7,
                nodes.lightOn.position.z - 0.245,
              ]}
            >
              <meshBasicMaterial color="#83b117" />
            </mesh>

            <mesh
              geometry={nodes.lightTravel.geometry}
              position={[
                nodes.lightTravel.position.x - 0.045,
                nodes.lightTravel.position.y - 0.7,
                nodes.lightTravel.position.z - 0.245,
              ]}
            >
              <meshBasicMaterial color="#3657d1" />
            </mesh>
    
          </group>
        </group>
    </>
  );
};

export default BasicWorld;
