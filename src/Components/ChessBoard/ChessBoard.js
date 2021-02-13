import React from 'react';

import './ChessBoard.css';

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
                {/* {
                    new Array(8).fill(null).map((rank, rankIdx) => {
                        <div
                            className="chess-board-rank"
                            key={`rank${rankIdx + 1}`}>
                            {
                                new Array(8).fill(null).map((file, fileIdx) =>
                                    <div key={`square${fileIdx + 1}-${rankIdx + 1}`} ></div>
                                )
                            }
                        </div>
                    }
                } */}
            </div>
        );
    }
}

export default ChessBoard;