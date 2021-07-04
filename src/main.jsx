import React, { StrictMode } from 'react';
import { render } from 'react-dom';

import { App } from './app';
import './styles.css';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);
