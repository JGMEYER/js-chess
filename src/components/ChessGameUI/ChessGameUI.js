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
            currentPlayer: Color.WHITE,
        }

        this.selectPiece = this.selectPiece.bind(this);
        this.movePiece = this.movePiece.bind(this);
    }

    /**
     * Select chess piece for movement.
     * @param {ChessPiece} piece
     */
    selectPiece(piece) {
        if (piece === this.state.selectedPiece) {
            // Deselect piece
            this.setState(prev => ({
                ...prev,
                selectedPiece: null,
            }));
        } else {
            if (piece.color === this.state.currentPlayer) {
                // Select piece
                this.setState(prev => ({
                    ...prev,
                    selectedPiece: piece,
                }));
            }
        }
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

        let nextPlayer = this.state.currentPlayer;

        const validMoves = this.state.selectedPiece.validMoves(
            this.state.chessBoardState
        )
        const move = validMoves.filter(move =>
            move.coordsAEnd[0] === row && move.coordsAEnd[1] === col)[0];
        if (move) {
            move.execute(this.state.chessBoardState);
            nextPlayer =
                this.state.currentPlayer === Color.WHITE
                    ? Color.BLACK
                    : Color.WHITE;
        } else {
            console.log('Invalid move');
        }

        console.log(this.state.chessBoardState.toFEN());

        this.setState(prev => ({
            ...prev,
            chessBoardState: new ChessBoardState(
                this.state.chessBoardState.board,
                nextPlayer,
            ),
            selectedPiece: null,
            currentPlayer: nextPlayer,
        }));
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