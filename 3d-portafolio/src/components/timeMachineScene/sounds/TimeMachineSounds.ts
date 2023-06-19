import { gsap } from "gsap";
import { isMobileOrTablet } from "../../shared/utils/ResponsiveCheck";

export class TimeMachineSounds {
  private static instance: TimeMachineSounds;
  audioContext: AudioContext;
  // @ts-ignore
  machineSounds: AudioBufferSourceNode;
   // @ts-ignore
  vlmController: GainNode

  private constructor() {
    // @ts-ignore
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.loadAudio('/sounds/timeMachineScene/wind.mp3');

    // Volume controller
    this.vlmController = this.audioContext.createGain()
    this.vlmController.gain.value = 1
    this.vlmController.connect(this.audioContext.destination)
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
        this.machineSounds.connect(this.vlmController);
      });
    };

    request.send();
  }


  public stopSounds() {
    gsap.to(this.vlmController.gain, {
      value: 0,
      duration: 2.5,
      onComplete: () => {
        this.machineSounds.stop(0);
      },
    });
  }
}