const LavaLamp = () => {
  return (
    <mesh position={[ 0.862, 0.345, 0.8615 ]}>
      <cylinderGeometry args={[ 0.0075, 0.0201, 0.06, 12 ]} />
      <meshStandardMaterial color={[ 10, 0, 0 ]} toneMapped={false} />
    </mesh>
  );
}

export default LavaLamp;