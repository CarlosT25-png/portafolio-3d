import { gsap } from "gsap"

export const mountOverlay = ( duration: number ) => {
  const overlay = document.createElement('div')
  overlay.id = 'overlay-transition'
  overlay.style.width = `${window.innerWidth}px`
  overlay.style.height = `${window.innerHeight}px`
  overlay.style.zIndex = '20'
  overlay.style.backgroundColor = 'black'
  overlay.style.position = 'absolute'
  overlay.style.top = '50%'
  overlay.style.left = '50%'
  overlay.style.transform = 'translate(-50%,-50%)'
  overlay.style.opacity = '0'
  document.body.appendChild(overlay)
  gsap.to(overlay.style, {
    opacity: 1,
    duration: duration,
  })
}

export const unmountOverlay = () => {
  const overlay = document.getElementById('overlay-transition');
  if (overlay && overlay.parentNode) {
    overlay.parentNode.removeChild(overlay);
  }
}