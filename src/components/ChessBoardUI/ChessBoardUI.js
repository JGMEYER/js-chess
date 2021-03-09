import React from 'react';
import PropTypes from 'prop-types';

import './ChessBoardUI.css';

class ChessBoardUI extends React.Component {
    constructor(props) {
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(row, col) {
        this.props.movePiece(row, col)
    }

    render() {
        return (
            <div className="chess-board-container">
                <div className="chess-board">
                    {
                        new Array(64).fill(null).map((square, idx) =>
                            <div
                                key={`square${idx}`}
                                onClick={() => this.handleOnClick(
                                    Math.floor(idx / 8),
                                    idx % 8,
                                )}>
                            </div>
                        )
                    }
                </div>
                <div className="chess-board-ranks">
                    <p>8</p>
                    <p>7</p>
                    <p>6</p>
                    <p>5</p>
                    <p>4</p>
                    <p>3</p>
                    <p>2</p>
                    <p>1</p>
                </div>
                <div className="chess-board-files">
                    <p>a</p>
                    <p>b</p>
                    <p>c</p>
                    <p>d</p>
                    <p>e</p>
                    <p>f</p>
                    <p>g</p>
                    <p>h</p>
                </div>
            </div>
        );
    }
}

ChessBoardUI.propTypes = {
    movePiece: PropTypes.func.isRequired,
}

export default ChessBoardUI;