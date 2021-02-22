import { cloneDeep } from 'lodash';

import Bishop from './Bishop';
import Knight from './Knight';
import Pawn from './Pawn';
import Rook from './Rook';
import Queen from './Queen';
import King from './King';
import ChessPiece from './ChessPiece';
import Move from './Move';
import Color from '../utils/color';

/**
 * Handles the state of the chess board and its pieces.
 */
class ChessBoardState {
    constructor(board) {
        if (board) {
            this.board = board;
        } else {
            this.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ]
        }
    }

    /**
     * Returns the piece at (row, col).
     * @param {number} row
     * @param {number} col
     */
    get(row, col) {
        return this.board[row][col];
    }

    /**
     * Reset the game board.
     */
    reset() {
        this.board = [
            [new Rook(Color.BLACK, 0, 0), new Knight(Color.BLACK, 0, 1), new Bishop(Color.BLACK, 0, 2), new Queen(Color.BLACK, 0, 3), new King(Color.BLACK, 0, 4), new Bishop(Color.BLACK, 0, 5), new Knight(Color.BLACK, 0, 6), new Rook(Color.BLACK, 0, 7)],
            [new Pawn(Color.BLACK, 1, 0), new Pawn(Color.BLACK, 1, 1), new Pawn(Color.BLACK, 1, 2), new Pawn(Color.BLACK, 1, 3), new Pawn(Color.BLACK, 1, 4), new Pawn(Color.BLACK, 1, 5), new Pawn(Color.BLACK, 1, 6), new Pawn(Color.BLACK, 1, 7)],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [new Pawn(Color.WHITE, 6, 0), new Pawn(Color.WHITE, 6, 1), new Pawn(Color.WHITE, 6, 2), new Pawn(Color.WHITE, 6, 3), new Pawn(Color.WHITE, 6, 4), new Pawn(Color.WHITE, 6, 5), new Pawn(Color.WHITE, 6, 6), new Pawn(Color.WHITE, 6, 7)],
            [new Rook(Color.WHITE, 7, 0), new Knight(Color.WHITE, 7, 1), new Bishop(Color.WHITE, 7, 2), new Queen(Color.WHITE, 7, 3), new King(Color.WHITE, 7, 4), new Bishop(Color.WHITE, 7, 5), new Knight(Color.WHITE, 7, 6), new Rook(Color.WHITE, 7, 7)],
        ]
    }

    /**
     * Executes move
     * @param {Move} move
     */
    move(move) {
        const [aR1, aC1] = move.coordsAStart;
        const [aR2, aC2] = move.coordsAEnd;
        const pieceA = this.board[aR1][aC1];
        this.board[aR2][aC2] = pieceA;
        this.board[aR1][aC1] = null;
        pieceA.move(aR2, aC2);

        if (move.coordsBStart !== null && move.coordsBEnd !== null) {
            const [bR1, bC1] = move.coordsBStart;
            const [bR2, bC2] = move.coordsBEnd;
            const pieceB = this.board[bR1][bC1];
            this.board[bR2][bC2] = pieceB;
            this.board[bR1][bC1] = null;
            pieceB.move(bR2, bC2);
        }
    }

    /**
     * Returns whether king of given color is currently in check.
     * @param {Color} color
     * @returns {boolean} King currently in check
     */
    kingInCheck(color) {
        const king = this.getPiecesFor(color).filter(
            piece => piece instanceof King
        )[0];
        const enemyPieces = this.getPiecesFor(
            color === Color.WHITE ? Color.BLACK : Color.WHITE
        );

        for (let i = 0; i < enemyPieces.length; i++) {
            const enemyPiece = enemyPieces[i];
            const validMoves = enemyPiece.validMoves(this, false);
            const validMovesOnKing = validMoves.filter(
                move => move.coordsAEnd[0] === king.row && move.coordsAEnd[1] === king.col
            )
            if (validMovesOnKing.length > 0) {
                return true;
            }
        }

        return false;
    }

    /**
     * Returns whether king of given color is currently in checkmate.
     * @param {Color} color
     * @returns {boolean} King in checkmate
     */
    kingInCheckmate(color) {
        if (!this.kingInCheck(color)) {
            return false;
        }

        const pieces = this.getPiecesFor(color);
        const validMoves = [];
        pieces.forEach(piece => {
            validMoves.push(...piece.validMoves(this));
        });

        return validMoves.length === 0;
    }

    /**
     * Returns whether king of given color would be in check after the given
     * move.
     * @param {Color} color
     * @param {number} r1 row1
     * @param {number} c1 col1
     * @param {number} r2 row2
     * @param {number} c2 col2
     * @returns {boolean} King would be in check
     */
    kingWouldBeInCheck(color, move) {
        const cloneState = cloneDeep(this);
        move.execute(cloneState);
        return cloneState.kingInCheck(color);
    }

    /**
     * Returns an array of all pieces on the board.
     * @returns {Array<ChessPiece>}
     */
    getPieces() {
        const chessPieces = [];
        this.board.forEach(row => {
            row.forEach(piece => {
                if (piece !== null) {
                    chessPieces.push(piece);
                }
            });
        });
        return chessPieces;
    }

    /**
     * Returns an array of all pieces on the board for the given color.
     * @param {Color} color
     * @returns {Array<ChessPiece>}
     */
    getPiecesFor(color) {
        const chessPieces = [];
        this.board.forEach(row => {
            row.forEach(piece => {
                if (piece !== null && piece.color === color) {
                    chessPieces.push(piece);
                }
            });
        });
        return chessPieces;
    }

    /**
     * Pretty print the board state to the console.
     */
    print() {
        let rowStrings = [];
        this.board.forEach(row => {
            let rowString = '';
            row.forEach(piece => {
                rowString += piece === null ? '.' : piece.icon;
            })
            rowStrings.push(rowString);
        })
        console.log(rowStrings.join('\n'));
    }
}

export default ChessBoardState;