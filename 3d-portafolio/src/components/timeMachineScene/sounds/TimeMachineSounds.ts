import { gsap } from "gsap";

export class TimeMachineSounds {

  private static instance: TimeMachineSounds;
  machineSounds: HTMLAudioElement;

  private constructor () {
    this.machineSounds = new Audio('/sounds/timeMachineScene/machine.mp3')
    this.machineSounds.loop = true
    this.machineSounds.volume = 0.025
  }

  public static getInstance () {
    if(!TimeMachineSounds.instance) {
      TimeMachineSounds.instance = new TimeMachineSounds()
    }
    return TimeMachineSounds.instance
  }

  stopSounds () {
    gsap.to(this.machineSounds, {
      volume: 0,
      duration: 2.5,
      onComplete: () => {
        this.machineSounds.pause()
      },
    })
  }
}