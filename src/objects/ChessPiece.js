import ChessBoardState from './ChessBoardState';
import Color from '../utils/color';

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
     * Returns a set of valid moves for the ChessPiece.
     * @param {ChessBoardState} chessBoardState
     * @returns {Array<Array<number>} array of valid move coordinates.
     */
    validMoves(chessBoardState) {
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
