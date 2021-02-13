import ChessBoardState from './ChessBoardState';
import ChessPiece from './ChessPiece';
import Color from '../utils/color';

class Bishop extends ChessPiece {
    constructor(color, row, col) {
        const icon = color === Color.WHITE ? '♗' : '♝';
        super(icon, color, row, col);
    }

    /**
     * Helper function for finding valid moves along a diagonal.
     * @param {ChessBoardState} chessBoardState
     * @param {number} rowInc row increment
     * @param {number} colInc col increment
     */
    _validDiagonalMoves(chessBoardState, rowInc, colInc) {
        const validMoves = [];

        let pieceAtTarget = null;
        let row = this.row + rowInc;
        let col = this.col + colInc;

        while (row >= 0 && row <= 7 && col >= 0 && col <= 7) {
            pieceAtTarget = chessBoardState.get(row, col);
            if (pieceAtTarget) {
                if (pieceAtTarget.isEnemyOf(this.color)) {
                    validMoves.push([row, col]);
                }
                break;
            } else {
                validMoves.push([row, col]);
            }
            row += rowInc;
            col += colInc;
        }

        return validMoves;
    }

    /**
     * Returns an array of valid moves for the Bishop.
     * @param {ChessBoardState} chessBoardState
     * @returns {Array<Array<number>>} array of valid move coordinates.
     */
    validMoves(chessBoardState) {
        const upLeftMoves = this._validDiagonalMoves(chessBoardState, -1, -1);
        const upRightMoves = this._validDiagonalMoves(chessBoardState, -1, 1);
        const downLeftMoves = this._validDiagonalMoves(chessBoardState, 1, -1)
        const downRightMoves = this._validDiagonalMoves(chessBoardState, 1, 1)
        return [...upLeftMoves, ...upRightMoves, ...downLeftMoves, ...downRightMoves];
    }
}

export default Bishop;