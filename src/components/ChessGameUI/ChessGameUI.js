import React from 'react';

import ChessBoardUI from '../ChessBoardUI/ChessBoardUI';
import ChessPieceUI from '../ChessPieceUI/ChessPieceUI';
import ValidMovesUI from '../ValidMovesUI/ValidMovesUI';
import ChessBoardState from '../../objects/ChessBoardState';
import ChessPiece from '../../objects/ChessPiece';
import King from '../../objects/King';
import Color from '../../utils/color';

class ChessGameUI extends React.Component {

    constructor(props) {
        super(props);

        const chessBoardState = new ChessBoardState();
        chessBoardState.reset();

        this.state = {
            chessBoardState: chessBoardState,
            selectedPiece: null,
        }

        this.selectPiece = this.selectPiece.bind(this);
        this.movePiece = this.movePiece.bind(this);
    }

    /**
     * Select chess piece for movement.
     * @param {ChessPiece} piece
     */
    selectPiece(piece) {
        this.setState(prev => ({
            ...prev,
            selectedPiece: piece,
        }));
    }

    /**
     * Move selected piece if move is valid.
     * @param {number} row
     * @param {number} col
     */
    movePiece(row, col) {
        if (!this.state.selectedPiece) {
            console.log('No piece selected');
            return;
        }

        const validMoves = this.state.selectedPiece.validMoves(
            this.state.chessBoardState
        )
        const isValid = validMoves.filter(move =>
            move[0] === row && move[1] === col).length > 0;
        if (isValid) {
            this.state.chessBoardState.movePiece(
                this.state.selectedPiece.row,
                this.state.selectedPiece.col,
                row,
                col,
            );
        } else {
            console.log('Invalid move');
        }

        this.setState(prev => ({
            ...prev,
            selectedPiece: null,
        }));

        console.log('black', this.state.chessBoardState.kingInCheckmate(Color.BLACK));
        console.log('white', this.state.chessBoardState.kingInCheckmate(Color.WHITE));
    }

    /**
     * Render ChessGame.
     */
    render() {
        const chessPieces = this.state.chessBoardState.getPieces();
        return (
            <div>
                <ChessBoardUI movePiece={this.movePiece} />
                {
                    chessPieces.map(piece =>
                        <ChessPieceUI
                            key={`chess-piece${piece.id}`}
                            piece={piece}
                            isInCheck={
                                piece instanceof King
                                && this.state.chessBoardState.kingInCheck(piece.color)
                            }
                            selectPiece={() => this.selectPiece(piece)} />
                    )
                }
                {
                    this.state.selectedPiece
                        ? <ValidMovesUI
                            validMoves={
                                this.state.selectedPiece.validMoves(
                                    this.state.chessBoardState
                                )
                            }
                            movePiece={this.movePiece} />
                        : <div></div>
                }
            </div>
        );
    }
}

export default ChessGameUI;