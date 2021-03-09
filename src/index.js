import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import ChessGameUI from './components/ChessGameUI/ChessGameUI';

ReactDOM.render(
  <React.StrictMode>
    <div id="app-container">
      <ChessGameUI />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
