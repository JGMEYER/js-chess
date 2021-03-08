import React from 'react';
import PropTypes from 'prop-types';

import './CapturedPiecesUI.css';
import Bishop from '../../objects/Bishop';
import ChessPiece from '../../objects/ChessPiece';
import Color from '../../utils/color';

class CapturedPiecesUI extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const sortedPieces = [...this.props.piecesCaptured];
        sortedPieces.sort((a, b) => {
            if (a.points === b.points) {
                if (a instanceof Bishop) {
                    return -1;
                } else {
                    return 1;
                }
            } else if (a.points > b.points) {
                return -1;
            } else {
                return 1;
            }
        });
        const totalPoints = sortedPieces.reduce((total, piece) => total + piece.points, 0);
        return (
            <div className="captured-pieces-ui">
                <p className="captured-pieces-points">
                    {totalPoints}
                </p>
                {
                    sortedPieces.map(piece =>
                        <p
                            className={`captured-piece ${piece.color === Color.WHITE ? 'white' : 'black'}`}
                            key={`captured-piece${piece.id}`}>
                            {piece.icon}
                        </p>
                    )
                }
            </div>
        );
    }
}

CapturedPiecesUI.propTypes = {
    piecesCaptured: PropTypes.arrayOf(ChessPiece).isRequired,
}

export default CapturedPiecesUI;