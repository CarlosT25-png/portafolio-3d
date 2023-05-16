import { Html } from '@react-three/drei'
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

const Screen = () => {
  const { viewport, camera } = useThree();

const groupRef = useRef<THREE.Group>(null!);
  useEffect(() => {
    const groupRefCopy = groupRef.current;
    camera.add(groupRefCopy);
    return () => {
      camera.remove(groupRefCopy);
    };
  }, [camera, groupRef.current]);

  return (
    <group ref={groupRef} position={[-viewport.width / 3.5, viewport.height / 3.8, -5]} rotation={[0, 0, 0]}>
      <Html style={{ userSelect: "none" }}>
      <iframe
          src='https:carlostorres.dev'
          style={{ width: '700px', height: '600px' }}
        />
      </Html>
    </group>
  );
  
  return (
    <group rotation={ [ 0, - Math.PI * 0.5, 0 ] }>
      <Html
        as='div' // Wrapping element (default: 'div')
        wrapperClass='htmlScreen'
        transform // If true, applies matrix3d transformations (default=false)
        distanceFactor={0.08}
        position={[ 0.4, 0.4, -1]}
        // rotation={ [ 0, - Math.PI * 0.5, 0 ] }
        // scale={ 0.1 }
        fullscreen
      >
        <iframe
          src='https:carlostorres.dev'
          style={{ width: '700px', height: '600px' }}
        />
      </Html>
    </group>
  )
}

export default Screen
