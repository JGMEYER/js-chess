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
        );
    }
}

ChessBoardUI.propTypes = {
    movePiece: PropTypes.func.isRequired,
}

export default ChessBoardUI;