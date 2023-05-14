import { gsap } from "gsap";
import { useEffect } from "react";

const SoundEffects: React.FC<{ fixedSoundUrl: string, randomSoundUrl: string }> = ({ fixedSoundUrl, randomSoundUrl }) => {

  // For play the fan noises

  useEffect(() => {
    const audio = new Audio(fixedSoundUrl)
    audio.loop = true;
    audio.play();
    audio.volume = 0.15;

    // Increase the volume when the camera is facing the machine
    gsap.to( audio , {
      volume: 0.25,
      duration: 1,
      delay: 5
    })
  }, []);

  // For play randomly the electric sound

  useEffect(() => {
    const randomIntervalId = setInterval(() => {
      const audio = new Audio(randomSoundUrl);
      audio.play();
      audio.volume = Math.random() * 0.04 + 0.01;
    }, (Math.floor(Math.random() * 16) + 10) * 1000); // Random interval between 10 and 25 seconds

    return () => {
      clearInterval(randomIntervalId);
    };
  }, [ randomSoundUrl ]);


  return (
    null
  );
}

export default SoundEffects;