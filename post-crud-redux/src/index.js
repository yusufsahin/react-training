import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
// eslint-disable-next-line
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css'; // Optional Bootswatch theme

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
