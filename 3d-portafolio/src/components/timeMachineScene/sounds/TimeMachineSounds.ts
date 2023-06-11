import { gsap } from "gsap";
import { getBrowser, isMobileOrTablet } from "../../shared/utils/ResponsiveCheck";

export class TimeMachineSounds {

  private static instance: TimeMachineSounds;
  machineSounds: HTMLAudioElement;

  private constructor () {
    this.machineSounds = new Audio('/sounds/timeMachineScene/machine.mp3')
    this.machineSounds.loop = true
    this.machineSounds.volume = isMobileOrTablet() ? 0.005 : 0.05
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

function handleVisibilityChange() {
  const snd = TimeMachineSounds.getInstance()
  if (document.visibilityState === 'hidden') {
    snd.machineSounds.volume = 0;
  } else {
    snd.machineSounds.volume = isMobileOrTablet() ? 0.005 : 0.05
  }
}

document.addEventListener('visibilitychange', handleVisibilityChange);