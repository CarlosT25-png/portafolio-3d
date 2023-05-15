import { Html } from '@react-three/drei'

const Screen = () => {
  return (
    <Html
      as='div' // Wrapping element (default: 'div')
      wrapperClass="htmlScreen"
      transform // If true, applies matrix3d transformations (default=false)
      distanceFactor={ 1.17 }
      position={ [ 1, 0.4, 0.5 ] }
      rotation={ [ 0, - Math.PI * 0.5, 0 ] }
      // scale={ 0.1 }
      fullscreen
    >
      <iframe src='https:carlostorres.dev' style={{ width: '700px',  height: '600px'}} />
    </Html>
  )
}

export default Screen
