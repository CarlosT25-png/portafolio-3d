import { Leva } from 'leva'
import React, { useLayoutEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './styles/main.css'
import IndexExperience from './components/IndexExperience'
import { Provider } from 'react-redux'
import store from './store'

// Hook to handle window resize
function useWindowSize() {
  const [sizes, setSizes] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize() {
      setSizes([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return sizes
}

function Main() {
  const [widthR, heightR] = useWindowSize()
  return (
    <Provider store={store}>
      <div style={{ width: widthR, height: heightR, position: 'relative'}}>
        <IndexExperience />
      </div>
    </Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)
