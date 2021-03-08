import ChessBoardState from './ChessBoardState';
import Color from '../utils/color';
import Move from './Move';
import { rowCol2FileRank } from '../utils/board';

/**
 * A chess piece on the game board.
 */
class ChessPiece {
    static count = 0;

    /**
     * @constructor
     * @param {string} icon
     * @param {string} printIcon Icon for debug/print
     * @param {string} notation
     * @param {Color} color
     * @param {number} row
     * @param {number} col
     */
    constructor(icon, printIcon, notation, points, color, row, col) {
        if (this.constructor == ChessPiece) {
            throw new Error('Cannot instantiate abstract class ChessPiece');
        }

        this.id = ChessPiece.count;
        this.icon = icon;
        this.printIcon = printIcon;
        this.notation = notation;
        this.points = points;
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
     * Get fileRank of piece.
     */
    getFileRank() {
        return rowCol2FileRank([this.row, this.col]);
    }

    /**
     * Get a move from this piece's location to the specified location.
     * @param {Array<number>} to [row, col]
     * @param {string} promotion promotion i.e. /[qrbn]/
     */
    getMoveRowCol(toRowCol, promotion = null) {
        const from = rowCol2FileRank([this.row, this.col]);
        const to = rowCol2FileRank(toRowCol);
        return new Move(from, to, promotion);
    }

    /**
     * Get a move from this piece's location to the specified location.
     * @param {string} to fileRank
     * @param {string} promotion promotion i.e. /[qrbn]/
     */
    getMoveFileRank(toFileRank, promotion = null) {
        const from = rowCol2FileRank([this.row, this.col]);
        const to = toFileRank;
        return new Move(from, to, promotion);
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
            move = this.getMoveRowCol([row, col]);

            if (pieceAtTarget) {
                if (pieceAtTarget.isEnemyOf(this.color)) {
                    if (checkIfKingInCheck) {
                        if (!chessBoardState.kingWouldBeInCheck(this.color, move)) {
                            validMoves.push(move);
                        }
                    } else {
                        validMoves.push(move);
                    }
                }
                break;
            } else {
                if (checkIfKingInCheck) {
                    if (!chessBoardState.kingWouldBeInCheck(this.color, move)) {
                        validMoves.push(move);
                    }
                } else {
                    validMoves.push(move);
                }
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
