import { gsap } from 'gsap'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

interface Props {
  fixedSoundUrl: string;
  randomSoundUrl: string
  playSound: ( audioRef: HTMLAudioElement, secondAudioRef: HTMLAudioElement ) => {}
}

const SoundEffects= ({
  fixedSoundUrl,
  randomSoundUrl,
  playSound
}: Props ) => {
  const [fixedSound, setFixedSound] = useState<HTMLAudioElement>(null!)
  const [rndmSound, setRndmSound] = useState<HTMLAudioElement>(null!)

  const playSoundAllWebsite = useSelector<RootState>(
    (state) => state.globalConfig.playSoundAllWebsite
  ) as Boolean
  const playSoundTimeMachine = useSelector<RootState>(
    (state) => state.globalConfig.playSoundTimeMachine
  ) as Boolean


// Update the fixed sound and call the callback function
  const handleSoundChange = (sound: HTMLAudioElement) => {
    playSound(fixedSound, rndmSound)
  };

  // For play the fan noises

  useEffect(() => {
    if (playSoundAllWebsite) {
      const audio = new Audio(fixedSoundUrl)
      audio.loop = true
      audio.volume = 0.05
      // audio.play()

      setFixedSound(audio)
    }
  }, [playSoundAllWebsite])

  // For play randomly the electric sound

  useEffect(() => {
    const randomIntervalId = setInterval(() => {
      const audio = new Audio(randomSoundUrl)
      audio.play()
      audio.volume = Math.random() * 0.04 + 0.01
      setRndmSound(audio)
    }, (Math.floor(Math.random() * 16) + 10) * 1000) // Random interval between 10 and 25 seconds

    return () => {
      clearInterval(randomIntervalId)
    }
  }, [randomSoundUrl])

  useEffect(() => {
    // In case that scene has changed
    if (!playSoundTimeMachine) {
      gsap.to(fixedSound, {
        volume: 0,
        duration: 2.5,
        onComplete: () => {
          fixedSound.pause()
        },
      })
      gsap.to(rndmSound, {
        volume: 0,
        duration: 2.5,
        onComplete: () => {
          rndmSound.pause()
        },
      })
    }
  }, [playSoundTimeMachine])

  useEffect(() => {
    if (fixedSound && rndmSound) {
      if (!playSoundAllWebsite) {
        fixedSound.muted = true
        rndmSound.muted = true
      } else if (
        playSoundAllWebsite &&
        fixedSound.muted === true &&
        rndmSound.muted === true
      ) {
        fixedSound.muted = false
        rndmSound.muted = false
      }
    }
  }, [playSoundAllWebsite])

  return null
}

export default SoundEffects
