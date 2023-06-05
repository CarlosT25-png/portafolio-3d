import { PositionalAudio } from "@react-three/drei";


const PlayRecord = () => {
  return (
    <mesh position={[ -0.6, 0.5, 0 ]} scale={0.01}>
      <boxGeometry attach='geometry' />
      <meshBasicMaterial attach='material' color='black' />
      {/* @ts-ignore */}
      <PositionalAudio url='/sounds/bedroomScene/red-eye-by-hola-beats.mp3' autoplay loop setVolume={0.2}/>
    </mesh>
  )
}

export default PlayRecord
