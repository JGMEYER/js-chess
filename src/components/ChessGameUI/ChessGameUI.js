/* Chess pieces */
/* ♔♕♖♗♘♙ */
/* ♚♛♜♝♞♟ */

import React from 'react';

import ChessBoardUI from '../ChessBoardUI/ChessBoardUI';
import ChessPieceUI from '../ChessPieceUI/ChessPieceUI';
import ChessBoardState from '../../objects/ChessBoardState';

class ChessGameUI extends React.Component {

    constructor(props) {
        super(props);

        const chessBoardState = new ChessBoardState();
        chessBoardState.reset();

        this.state = {
            chessBoardState: chessBoardState,
        }
    }

    /**
     * Render ChessGame.
     */
    render() {
        const chessPieces = this.state.chessBoardState.getPieces();
        return (
            <div>
                <ChessBoardUI />
                {
                    chessPieces.map(piece =>
                        <ChessPieceUI piece={piece} />
                    )
                }
            </div>
        );
    }
}

export default ChessGameUI;