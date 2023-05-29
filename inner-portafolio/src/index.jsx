import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import { Provider } from 'react-redux';

import App from './App';
import store from './store/index';
import './index.css';

i18next.init({
  interpolation: { escapeValue: false },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <I18nextProvider>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </I18nextProvider>
);
