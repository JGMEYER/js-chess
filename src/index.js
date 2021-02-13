import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import ChessGame from './components/ChessGameUI/ChessGameUI';

ReactDOM.render(
  <React.StrictMode>
    <ChessGame />
  </React.StrictMode>,
  document.getElementById('root')
);
