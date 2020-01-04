import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import React from 'react';
import App from './App';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
