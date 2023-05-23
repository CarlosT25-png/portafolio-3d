import { gsap } from "gsap";
import { useEffect, useState } from "react";

const SoundEffects: React.FC<{ fixedSoundUrl: string, randomSoundUrl: string, destroy: boolean }> = ({ fixedSoundUrl, randomSoundUrl, destroy }) => {

  const [ fixedSound, setFixedSound ] = useState<HTMLAudioElement>(null!);
  const [ rndmSound, setRndmSound] = useState<HTMLAudioElement>(null!);

  // For play the fan noises

  useEffect(() => {
    const audio = new Audio(fixedSoundUrl)
    audio.loop = true;
    audio.play();
    audio.volume = 0.05;

    // Increase the volume when the camera is facing the machine
    gsap.to( audio , {
      volume: 0.1,
      duration: 1,
      delay: 5
    })

    setFixedSound(audio)
  }, []);

  // For play randomly the electric sound

  useEffect(() => {
    const randomIntervalId = setInterval(() => {
      const audio = new Audio(randomSoundUrl);
      audio.play();
      audio.volume = Math.random() * 0.04 + 0.01;
      setRndmSound(audio)
    }, (Math.floor(Math.random() * 16) + 10) * 1000); // Random interval between 10 and 25 seconds

    return () => {
      clearInterval(randomIntervalId);
    };
  }, [ randomSoundUrl ]);

  useEffect(() => {
    if(destroy) {
      gsap.to(fixedSound, {
        volume: 0,
        duration: 2.5,
        onComplete: () => {
          fixedSound.pause()
        }
      })
      gsap.to(rndmSound, {
        volume: 0,
        duration: 2.5,
        onComplete: () => {
          rndmSound.pause()
        }
      })
    }
  }, [destroy])

  return (
    null
  );
}

export default SoundEffects;