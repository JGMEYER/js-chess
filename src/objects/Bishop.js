import ChessBoardState from './ChessBoardState';
import ChessPiece from './ChessPiece';
import Color from '../utils/color';

class Bishop extends ChessPiece {
    constructor(color, row, col) {
        const icon = '♝';
        const printIcon = color === Color.WHITE ? '♗' : '♝';
        const notation = color === Color.WHITE ? 'B' : 'b';
        super(icon, printIcon, notation, color, row, col);
    }

    /**
     * Returns an array of valid moves for the Bishop.
     * @param {ChessBoardState} chessBoardState
     * @returns {Array<Array<number>>} array of valid move coordinates.
     */
    validMoves(chessBoardState, checkIfKingInCheck = true) {
        const upLeftMoves = this._validMovesAlongLine(chessBoardState, -1, -1, checkIfKingInCheck);
        const upRightMoves = this._validMovesAlongLine(chessBoardState, -1, 1, checkIfKingInCheck);
        const downLeftMoves = this._validMovesAlongLine(chessBoardState, 1, -1, checkIfKingInCheck)
        const downRightMoves = this._validMovesAlongLine(chessBoardState, 1, 1, checkIfKingInCheck)
        return [...upLeftMoves, ...upRightMoves, ...downLeftMoves, ...downRightMoves];
    }
}

export default Bishop;