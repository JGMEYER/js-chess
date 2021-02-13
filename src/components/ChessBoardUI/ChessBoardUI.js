import React from 'react';

import './ChessBoardUI.css';

class ChessBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="chess-board">
                {
                    new Array(64).fill(null).map((square, idx) =>
                        <div key={`square${idx}`}></div>
                    )
                }
            </div>
        );
    }
}

export default ChessBoard;