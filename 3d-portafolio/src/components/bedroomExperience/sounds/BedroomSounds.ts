import { gsap } from 'gsap'
import { isMobileOrTablet } from '../../shared/utils/ResponsiveCheck'

export class BedroomSounds {
  private static instance: BedroomSounds
  audioContext: AudioContext
  // @ts-ignore
  musicBg: AudioBufferSourceNode
  // @ts-ignore
  vlmController: GainNode

  private constructor() {
    // @ts-ignore
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    this.loadAudio('/sounds/bedroomScene/red-eye-by-hola-beats.mp3')

    // Volume controller
    this.vlmController = this.audioContext.createGain()
    this.vlmController.gain.value = isMobileOrTablet() ? 0.1 : 0.2
    this.vlmController.connect(this.audioContext.destination)
  }

  public static getInstance() {
    if (!BedroomSounds.instance) {
      BedroomSounds.instance = new BedroomSounds()
    }
    return BedroomSounds.instance
  }

  private loadAudio(url: string) {
    const request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.responseType = 'arraybuffer'

    request.onload = () => {
      this.audioContext.decodeAudioData(request.response, (buffer) => {
        this.musicBg = this.audioContext.createBufferSource()
        this.musicBg.buffer = buffer
        this.musicBg.loop = true
        this.musicBg.connect(this.vlmController);
      })
    }

    request.send()
  }


  public stopSounds() {
    gsap.to(this.vlmController.gain, {
      value: 0,
      duration: 2.5,
      onComplete: () => {
        this.musicBg.stop(0);
      },
    });
  }
}
