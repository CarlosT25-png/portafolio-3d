import * as THREE from 'three'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'

export class ScreenTest {
  private static instance: ScreenTest | null = null

  private camera: THREE.Camera
  // private controls;
  private scene: THREE.Scene
  private renderer: CSS3DRenderer

  private constructor() {
    const container = document.getElementById('container') as HTMLDivElement
    container.style.backgroundColor = 'transparent'

    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      5000
    )
    this.camera.position.set(0, 0, 1000)

    this.scene = new THREE.Scene()

    this.renderer = new CSS3DRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.domElement.style.backgroundColor = 'transparent'
    this.renderer.domElement.style.position = 'absolute'
    this.renderer.domElement.style.top = '0'
    this.renderer.domElement.style.zIndex = '100'
    container.appendChild(this.renderer.domElement)

    const div = document.createElement('div')
    div.id = 'hola'
    div.style.width = `${1000}px`
    div.style.height = `${750}px`
    div.style.backgroundColor = '#fff'

    const iframe = document.createElement('iframe')
    iframe.style.width = '1000px'
    iframe.style.height = '750px'
    iframe.style.border = '0px'
    iframe.src = 'https://inner-portafolio.vercel.app/'
    div.appendChild(iframe)

    const object = new CSS3DObject(div)
    object.position.set(0, 0, 0)

    this.scene.add(object)
    this.animate = this.animate.bind(this)
    requestAnimationFrame(this.animate)


    window.addEventListener( 'resize', this.onWindowResize.bind(this) );
  }

  static getInstance() {
    if (this.instance) {
      return this.instance
    } else {
      this.instance = new ScreenTest()
      return this.instance
    }
  }

  private animate() {
    requestAnimationFrame( this.animate );
    this.renderer.render( this.scene, this.camera );
  }

  private onWindowResize() {

    // @ts-ignore
    this.camera.aspect = window.innerWidth / window.innerHeight;
    // @ts-ignore
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );

  }
}
