import { Leva } from 'leva'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/main.css'
import IndexExperience from './components/IndexExperience'
import { Provider } from 'react-redux'
import store from './store'

function Main() {
  return (
    <Provider store={store}>
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
    </Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)
