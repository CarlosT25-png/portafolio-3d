import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ACESFilmicToneMapping, sRGBEncoding } from 'three'
import { Scene } from './Scene'
import './styles/main.css'
import IndexExperience from './components/IndexExperience'

function Main() {
  return (
    <div className='main'>
      <Leva
        collapsed={false}
        oneLineLabels={false}
        flat={true}
        theme={{
          sizes: {
            titleBarHeight: '28px',
          },
          fontSizes: {
            root: '10px',
          },
        }}
      />
      <IndexExperience />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)
