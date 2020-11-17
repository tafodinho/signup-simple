import React from 'react';
import { render } from 'react-dom';

import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducer';

import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const Store = createStore(rootReducer)
console.log("STORE", Store)
render(
    <Provider store={Store}>
      <App />
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
