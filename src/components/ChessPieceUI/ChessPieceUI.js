import React from 'react';
import PropTypes from 'prop-types';

import './ChessPieceUI.css';

/**
 * A chess piece on the game board.
 */
class ChessPieceUI extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Render ChessPiece
     */
    render() {
        return (
            <div
                className="chess-piece"
                style={{
                    top: `${this.props.piece.row * 50}px`,
                    left: `${this.props.piece.col * 50}px`,
                }}>
                {this.props.piece.icon}
            </div>
        );
    }
}

ChessPieceUI.propTypes = {
    piece: PropTypes.object.isRequired,
}

export default ChessPieceUI;