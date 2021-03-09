import React from 'react';

import './ChessGameUI.css';
import CapturedPiecesUI from '../CapturedPiecesUI/CapturedPiecesUI';
import ChessBoardUI from '../ChessBoardUI/ChessBoardUI';
import ChessPieceUI from '../ChessPieceUI/ChessPieceUI';
import FENFormUI from '../FENFormUI/FENFormUI';
import ValidMovesUI from '../ValidMovesUI/ValidMovesUI';
import ChessBoardState from '../../objects/ChessBoardState';
import ChessPiece from '../../objects/ChessPiece';
import King from '../../objects/King';
import Stockfish from '../../objects/Stockfish';
import Color from '../../utils/color';
import HistoryControlUI from '../HistoryControlUI/HistoryControlUI';
import ChessBoardHistory from '../../objects/ChessBoardHistory';

class ChessGameUI extends React.Component {

    constructor(props) {
        super(props);

        const chessBoardState = new ChessBoardState();
        chessBoardState.reset();
        const chessBoardHistory = new ChessBoardHistory();
        chessBoardHistory.push(chessBoardState.toFEN());

        const stockfish = new Stockfish();

        this.state = {
            chessBoardState: chessBoardState,
            chessBoardHistory: chessBoardHistory,
            selectedPiece: null,
            whitePiecesCaptured: [],
            blackPiecesCaptured: [],
            stockfish: stockfish,
            stockfishSkillLevel: 0,
            stockfishDepth: 1,
        }

        this.selectPiece = this.selectPiece.bind(this);
        this.movePiece = this.movePiece.bind(this);
        this.updateBoard = this.updateBoard.bind(this);
        this.historyToStart = this.historyToStart.bind(this);
        this.historyBack = this.historyBack.bind(this);
        this.historyForward = this.historyForward.bind(this);
        this.historyToEnd = this.historyToEnd.bind(this);
    }

    /**
     * ComponentDidMount
     */
    componentDidMount() {
        // NOTE: Uncomment to enable Stockfish computer for black
        // // Set interval to check for engine best move results
        // this.intID = setInterval(() => {
        //     if (this.state.chessBoardState.currentPlayer === Color.WHITE) {
        //         // Computer only moves for black
        //         return;
        //     }

        //     if (this.state.stockfish.skillLevel !== this.state.stockfishSkillLevel) {
        //         this.state.stockfish.setSkillLevel(this.state.stockfishSkillLevel)
        //     }
        //     if (this.state.stockfish.depth !== this.state.stockfishDepth) {
        //         this.state.stockfish.setDepth(this.state.stockfishDepth);
        //     }

        //     const bestMove = this.state.stockfish.getBestMove();
        //     if (!bestMove && !this.state.stockfish.isThinking) {
        //         this.state.stockfish.searchBestMove(this.state.chessBoardState, this.state.stockfishDepth);
        //     } else if (bestMove) {
        //         this.state.chessBoardState.move(bestMove)
        //         this.state.stockfish.bestMove = null;

        //         this.setState(prev => ({
        //             ...prev,
        //             chessBoardState: ChessBoardState.fromFEN(this.state.chessBoardState.toFEN()),
        //         }));
        //     }
        // }, 500);
    }

    /**
     * Select chess piece for movement.
     * @param {ChessPiece} piece
     */
    selectPiece(piece) {
        if (this.state.chessBoardHistory.isInPast) {
            console.log('Cannot select pieces while in the past');
            return;
        }

        if (piece === this.state.selectedPiece) {
            // Deselect piece
            this.setState(prev => ({
                ...prev,
                selectedPiece: null,
            }));
        } else {
            // NOTE: Uncomment check to enable Stockfish computer for black
            // if (this.state.chessBoardState.currentPlayer === Color.WHITE && piece.color === Color.WHITE) {
            // Select piece if white (player) is moving
            if (this.state.chessBoardState.currentPlayer === piece.color) {
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
        if (this.state.chessBoardHistory.isInPast) {
            console.log('Cannot move pieces while in the past');
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
            const pieceCaptured = this.state.chessBoardState.move(move);
            if (pieceCaptured) {
                if (pieceCaptured.color === Color.WHITE) {
                    this.state.whitePiecesCaptured.push(pieceCaptured);
                } else if (pieceCaptured.color === Color.BLACK) {
                    this.state.blackPiecesCaptured.push(pieceCaptured);
                }
            }

            const newFEN = this.state.chessBoardState.toFEN();
            this.state.chessBoardHistory.push(newFEN);
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
     * Move history to start.
     */
    historyToStart() {
        const fenCode = this.state.chessBoardHistory.toStart();
        console.log('to start');
        console.log(this.state.chessBoardHistory);
        this.updateBoard(fenCode);
    }

    /**
     * Move history back a step.
     */
    historyBack() {
        const fenCode = this.state.chessBoardHistory.back();
        console.log('back');
        console.log(this.state.chessBoardHistory);
        this.updateBoard(fenCode);
    }

    /**
     * Move history forward a step.
     */
    historyForward() {
        const fenCode = this.state.chessBoardHistory.forward();
        console.log('forward');
        console.log(this.state.chessBoardHistory);
        this.updateBoard(fenCode);
    }

    /**
     * Move history to end.
     */
    historyToEnd() {
        const fenCode = this.state.chessBoardHistory.toEnd();
        console.log('to end');
        console.log(this.state.chessBoardHistory);
        this.updateBoard(fenCode);
    }

    /**
     * Render ChessGame.
     */
    render() {
        const chessPieces = this.state.chessBoardState.getPieces();
        return (
            <div>
                <div className="chess-board-game-ui-container">
                    <div className="chess-board-ui-container">
                        <ChessBoardUI movePiece={this.movePiece} />
                        {chessPieces.map(piece =>
                            <ChessPieceUI
                                key={`chess-piece${piece.id}`}
                                piece={piece}
                                isInCheck={
                                    piece instanceof King
                                    && this.state.chessBoardState.kingInCheck(piece.color)
                                }
                                selectPiece={() => this.selectPiece(piece)} />
                        )}
                        {this.state.selectedPiece
                            ? <ValidMovesUI
                                validMoves={
                                    this.state.selectedPiece.validMoves(
                                        this.state.chessBoardState
                                    )
                                }
                                movePiece={this.movePiece} />
                            : <div></div>}
                    </div>
                    <div className="chess-board-ui-sidebar">
                        <CapturedPiecesUI piecesCaptured={this.state.whitePiecesCaptured}></CapturedPiecesUI>
                        <HistoryControlUI
                            isInPast={this.state.chessBoardHistory.isInPast}
                            toStart={this.historyToStart}
                            back={this.historyBack}
                            forward={this.historyForward}
                            toEnd={this.historyToEnd}
                        >
                        </HistoryControlUI>
                        <CapturedPiecesUI piecesCaptured={this.state.blackPiecesCaptured}></CapturedPiecesUI>
                    </div>
                </div>
                <FENFormUI
                    fenCode={this.state.chessBoardState.toFEN()}
                    updateBoard={this.updateBoard}
                ></FENFormUI>
            </div>
        );
    }
}

export default ChessGameUI;