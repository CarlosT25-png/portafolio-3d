import * as THREE from 'three'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'

export class MonitorScreen {
  private static instance: MonitorScreen | null = null

  private camera: THREE.Camera
  // private controls;
  private scene: THREE.Scene
  private renderer: CSS3DRenderer
  private container: HTMLDivElement | null = null

  private constructor() {
    this.camera = new THREE.PerspectiveCamera(
      window.innerWidth < 768 ? 50 : 35,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    )

    this.renderer = new CSS3DRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.domElement.style.backgroundColor = 'transparent'
    this.renderer.domElement.id = 'renderer'
    this.renderer.domElement.style.position = 'absolute'
    this.renderer.domElement.style.top = '0'
    this.renderer.domElement.style.zIndex = '100'

    this.scene = new THREE.Scene()
    this.animate = this.animate.bind(this)
    requestAnimationFrame(this.animate)

    window.addEventListener('resize', this.onWindowResize.bind(this))
  }

  mountIframe() {
    if (!this.container) {
      this.container = document.createElement('div')
      this.container.id = 'monitorScreen'
      this.container.style.pointerEvents = 'none'
      this.container.style.backgroundColor = 'transparent'

      this.camera.position.set(0, 50, 1950)
      this.container.appendChild(this.renderer.domElement)

      const div = document.createElement('div')
      div.id = 'hola'
      div.style.width = `${1000}px`
      div.style.height = `${750}px`
      div.style.backgroundColor = '#000000'

      const iframe = document.createElement('iframe')
      iframe.style.width = '0px'
      iframe.style.height = '0px'
      iframe.style.border = '0px'
      iframe.src = 'https://inner-portafolio.vercel.app/'
      iframe.onload = () => {
        iframe.style.width = '1000px'
        iframe.style.height = '750px'
      }
      div.appendChild(iframe)

      const object = new CSS3DObject(div)
      object.position.set(0, 0, -5)

      this.scene.add(object)
      document.body.appendChild(this.container)
    }
  }

  unmountIframe() {
    if (this.container) {
      document.body.removeChild(document.getElementById('monitorScreen') as HTMLDivElement)
      this.container = null
    }
  }

  static getInstance() {
    if (this.instance) {
      return this.instance
    } else {
      this.instance = new MonitorScreen()
      return this.instance
    }
  }

  private animate() {
    requestAnimationFrame(this.animate)
    this.renderer.render(this.scene, this.camera)
  }

  private onWindowResize() {
    // @ts-ignore
    this.camera.aspect = window.innerWidth / window.innerHeight
    // @ts-ignore
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }
}
