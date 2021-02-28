import React from 'react';

import ChessBoardUI from '../ChessBoardUI/ChessBoardUI';
import ChessPieceUI from '../ChessPieceUI/ChessPieceUI';
import FENFormUI from '../FENFormUI/FENFormUI';
import ValidMovesUI from '../ValidMovesUI/ValidMovesUI';
import ChessBoardState from '../../objects/ChessBoardState';
import ChessPiece from '../../objects/ChessPiece';
import King from '../../objects/King';
import Stockfish from '../../objects/Stockfish';
import Color from '../../utils/color';

class ChessGameUI extends React.Component {

    constructor(props) {
        super(props);

        const chessBoardState = new ChessBoardState();
        chessBoardState.reset();

        const stockfish = new Stockfish();

        this.state = {
            chessBoardState: chessBoardState,
            selectedPiece: null,
            stockfish: stockfish,
            stockfishDepth: 1,
        }

        this.selectPiece = this.selectPiece.bind(this);
        this.movePiece = this.movePiece.bind(this);
        this.updateBoard = this.updateBoard.bind(this);
    }

    /**
     * ComponentDidMount
     */
    componentDidMount() {
        // Set interval to check for engine best move results
        this.intID = setInterval(() => {
            if (this.state.chessBoardState.currentPlayer === Color.WHITE) {
                // Computer only moves for black
                return;
            }

            const bestMove = this.state.stockfish.getBestMove();
            if (!bestMove && !this.state.stockfish.isThinking) {
                this.state.stockfish.searchBestMove(this.state.chessBoardState, this.state.stockfishDepth);
            } else if (bestMove) {
                this.state.chessBoardState.move(bestMove)
                this.state.stockfish.bestMove = null;

                this.setState(prev => ({
                    ...prev,
                    chessBoardState: ChessBoardState.fromFEN(this.state.chessBoardState.toFEN()),
                }));
            }
        }, 500);
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
            if (this.state.chessBoardState.currentPlayer === Color.WHITE && piece.color === Color.WHITE) {
                // Select piece if white (player) is moving
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

        const validMoves = this.state.selectedPiece.validMoves(
            this.state.chessBoardState
        )
        const move = validMoves.filter(move => {
            const [toR, toC] = move.toToRowCol();
            return toR === row && toC === col
        })[0];
        if (move) {
            this.state.chessBoardState.move(move);
        } else {
            console.log('Invalid move');
        }

        const newChessBoardState = ChessBoardState.fromFEN(this.state.chessBoardState.toFEN());

        this.setState(prev => ({
            ...prev,
            chessBoardState: newChessBoardState,
            selectedPiece: null,
        }));
    }

    /**
     * Update board to match FEN code.
     * @param {string} fenCode
     */
    updateBoard(fenCode) {
        const newChessBoardState = ChessBoardState.fromFEN(fenCode);
        this.setState(prev => ({
            ...prev,
            chessBoardState: newChessBoardState,
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
                <FENFormUI
                    fenCode={this.state.chessBoardState.toFEN()}
                    updateBoard={this.updateBoard}
                ></FENFormUI>
            </div>
        );
    }
}

export default ChessGameUI;