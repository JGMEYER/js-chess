import Pawn from './Pawn';
import Color from '../utils/color';

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
     * Reset the game board.
     */
    reset() {
        this.board = [
            [null, null, null, null, null, null, null, null],
            [new Pawn(Color.BLACK, 1, 0), new Pawn(Color.BLACK, 1, 1), new Pawn(Color.BLACK, 1, 2), new Pawn(Color.BLACK, 1, 3), new Pawn(Color.BLACK, 1, 4), new Pawn(Color.BLACK, 1, 5), new Pawn(Color.BLACK, 1, 6), new Pawn(Color.BLACK, 1, 7)],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [new Pawn(Color.WHITE, 6, 0), new Pawn(Color.WHITE, 6, 1), new Pawn(Color.WHITE, 6, 2), new Pawn(Color.WHITE, 6, 3), new Pawn(Color.WHITE, 6, 4), new Pawn(Color.WHITE, 6, 5), new Pawn(Color.WHITE, 6, 6), new Pawn(Color.WHITE, 6, 7)],
            [null, null, null, null, null, null, null, null],
        ]
    }

    /**
     * Moves the piece at (r1, c1) to (r2, c2).
     * @param {number} r1 row1
     * @param {number} c1 col1
     * @param {number} r2 row2
     * @param {number} c2 col2
     */
    move(r1, c1, r2, c2) {
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