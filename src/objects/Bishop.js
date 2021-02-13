import ChessBoardState from './ChessBoardState';
import ChessPiece from './ChessPiece';
import Color from '../utils/color';

class Bishop extends ChessPiece {
    constructor(color, row, col) {
        const icon = color === Color.WHITE ? '♗' : '♝';
        super(icon, color, row, col);
    }

    /**
     * Returns an array of valid moves for the Bishop.
     * @param {ChessBoardState} chessBoardState
     * @returns {Array<Array<number>>} array of valid move coordinates.
     */
    validMoves(chessBoardState) {
        const upLeftMoves = this._validMovesAlongLine(chessBoardState, -1, -1);
        const upRightMoves = this._validMovesAlongLine(chessBoardState, -1, 1);
        const downLeftMoves = this._validMovesAlongLine(chessBoardState, 1, -1)
        const downRightMoves = this._validMovesAlongLine(chessBoardState, 1, 1)
        return [...upLeftMoves, ...upRightMoves, ...downLeftMoves, ...downRightMoves];
    }
}

export default Bishop;