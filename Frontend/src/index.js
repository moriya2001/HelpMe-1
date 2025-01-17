import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import store from "./Redux-toolkit/store"
import { Provider } from 'react-redux'
import { ThemeProvider } from 'react-bootstrap';
// import { enableRtl } from '@syncfusion/ej2-base';
// enableRtl(true);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider dir="rtl" lang="he">
  <BrowserRouter>
  <React.StrictMode>
  <Provider store={store}>
    <App />

    </Provider>
  </React.StrictMode>
  </BrowserRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
