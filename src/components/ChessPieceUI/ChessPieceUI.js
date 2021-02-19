import React from 'react';
import PropTypes from 'prop-types';

import './ChessPieceUI.css';

/**
 * A chess piece on the game board.
 */
class ChessPieceUI extends React.Component {
    constructor(props) {
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        this.props.selectPiece();
    }

    /**
     * Render ChessPiece.
     */
    render() {
        let className = "chess-piece";
        if (this.props.isInCheck) {
            className += " in-check";
        }

        return (
            <div
                className={className}
                style={{
                    top: `${this.props.piece.row * 50}px`,
                    left: `${this.props.piece.col * 50}px`,
                }}
                onClick={this.handleOnClick} >
                {this.props.piece.icon}
            </div>
        );
    }
}

ChessPieceUI.propTypes = {
    piece: PropTypes.object.isRequired,
    isInCheck: PropTypes.bool.isRequired,
    selectPiece: PropTypes.func.isRequired,
}

export default ChessPieceUI;