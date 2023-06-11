import { gsap } from "gsap";
import { getBrowser, isMobileOrTablet } from "../../shared/utils/ResponsiveCheck";

export class TimeMachineSounds {
  private static instance: TimeMachineSounds;
  audioContext: AudioContext;
  // @ts-ignore
  machineSounds: AudioBufferSourceNode;

  private constructor() {
    // @ts-ignore
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.loadAudio('/sounds/timeMachineScene/machine.mp3');
  }

  public static getInstance() {
    if (!TimeMachineSounds.instance) {
      TimeMachineSounds.instance = new TimeMachineSounds();
    }
    return TimeMachineSounds.instance;
  }

  private loadAudio(url: string) {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = () => {
      this.audioContext.decodeAudioData(request.response, (buffer) => {
        this.machineSounds = this.audioContext.createBufferSource();
        this.machineSounds.buffer = buffer;
        this.machineSounds.loop = true;
        this.machineSounds.connect(this.audioContext.destination);
        this.updateVolume();
      });
    };

    request.send();
  }

  updateVolume() {
    if (this.machineSounds) {
      const gainNode = this.audioContext.createGain()
      gainNode.gain.value = isMobileOrTablet() ? 0.0005 : 0.025
      gainNode.connect(this.audioContext.destination)
    }
  }

  public stopSounds() {
    gsap.to(this.machineSounds, {
      volume: 0,
      duration: 2.5,
      onComplete: () => {
        this.machineSounds.stop(0);
      },
    });
  }
}

// function handleVisibilityChange() {
//   const snd = TimeMachineSounds.getInstance();
//   if (document.visibilityState === 'hidden') {
//     snd.stopSounds();
//   } else {
//     snd.updateVolume();
//   }
// }

// document.addEventListener('visibilitychange', handleVisibilityChange);
