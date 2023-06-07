import { PositionalAudio } from "@react-three/drei";
import { useEffect } from "react";


const PlayRecord = () => {

  useEffect(() => {
    const audio = new Audio('/sounds/bedroomScene/red-eye-by-hola-beats.mp3');
    audio.volume = 0.05;
    audio.loop = true
    setTimeout(() => {
      audio.play()
    }, 3500);
  }, [])

  return (
    null
  )
}

export default PlayRecord
