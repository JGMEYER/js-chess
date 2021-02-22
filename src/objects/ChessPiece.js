import ChessBoardState from './ChessBoardState';
import Color from '../utils/color';
import Move from './Move';

/**
 * A chess piece on the game board.
 */
class ChessPiece {
    static count = 0;

    /**
     * @constructor
     * @param {string} icon
     * @param {Color} color
     * @param {number} row
     * @param {number} col
     */
    constructor(icon, color, row, col) {
        if (this.constructor == ChessPiece) {
            throw new Error('Cannot instantiate abstract class ChessPiece');
        }

        this.id = ChessPiece.count;
        this.icon = icon;
        this.color = color;
        this.row = row;
        this.col = col;

        ChessPiece.count++;
    }

    /**
     * Move the ChessPiece to the designated (row, col).
     * @param {number} row
     * @param {number} col
     */
    move(row, col) {
        this.row = row;
        this.col = col;
    }

    /**
     * Helper function for finding valid moves along a line, i.e orthogonally
     * or on a diagonal.
     * @param {ChessBoardState} chessBoardState
     * @param {number} rowInc row increment
     * @param {number} colInc col increment
     * @param {boolean} checkIfKingInCheck helps prevent recursion
     */
    _validMovesAlongLine(chessBoardState, rowInc, colInc, checkIfKingInCheck) {
        const validMoves = [];

        let pieceAtTarget = null;
        let move = null;
        let row = this.row + rowInc;
        let col = this.col + colInc;

        while (row >= 0 && row <= 7 && col >= 0 && col <= 7) {
            pieceAtTarget = chessBoardState.get(row, col);
            move = new Move([this.row, this.col], [row, col])
            if (pieceAtTarget) {
                if (pieceAtTarget.isEnemyOf(this.color)) {
                    validMoves.push(move);
                }
                break;
            } else if (checkIfKingInCheck
                && chessBoardState.kingWouldBeInCheck(this.color, move)) {
                // do nothing
            } else {
                validMoves.push(move);
            }
            row += rowInc;
            col += colInc;
        }

        return validMoves;
    }

    /**
     * Returns a set of valid moves for the ChessPiece.
     * @param {ChessBoardState} chessBoardState
     * @param {boolean} checkIfKingInCheck helps prevent recursion
     * @returns {Array<Array<number>>} array of valid move coordinates.
     */
    validMoves(chessBoardState, checkIfKingInCheck) {
        throw new Error('Method validMoves() must be implemented.');
    }

    /**
     * Returns whether piece belongs to opponent of this piece's color.
     * @param {Color} color
     */
    isEnemyOf(color) {
        return color !== this.color;
    }
}

export default ChessPiece;
