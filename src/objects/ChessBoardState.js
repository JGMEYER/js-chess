import Bishop from './Bishop';
import Knight from './Knight';
import Pawn from './Pawn';
import Rook from './Rook';
import Color from '../utils/color';
import Queen from './Queen';
import King from './King';

/**
 * Handles the state of the chess board and its pieces.
 */
class ChessBoardState {
    constructor(board) {
        if (!board) {
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
            [new Rook(Color.WHITE, 7, 0), new Knight(Color.WHITE, 7, 1), new Bishop(Color.WHITE, 7, 2), new King(Color.WHITE, 7, 3), new Queen(Color.WHITE, 7, 4), new Bishop(Color.WHITE, 7, 5), new Knight(Color.WHITE, 7, 6), new Rook(Color.WHITE, 7, 7)],
        ]
    }

    /**
     * Moves the piece at (r1, c1) to (r2, c2).
     * @param {number} r1 row1
     * @param {number} c1 col1
     * @param {number} r2 row2
     * @param {number} c2 col2
     */
    movePiece(r1, c1, r2, c2) {
        const pieceToMove = this.board[r1][c1]
        this.board[r2][c2] = pieceToMove;
        this.board[r1][c1] = null;
        pieceToMove.move(r2, c2);
    }

    /**
     * Returns an array of all pieces on the board.
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
}

export default ChessBoardState;