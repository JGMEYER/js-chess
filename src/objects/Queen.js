import ChessBoardState from './ChessBoardState';
import ChessPiece from './ChessPiece';
import Color from '../utils/color';

class Queen extends ChessPiece {
    constructor(color, row, col) {
        const icon = '♛';
        const printIcon = color === Color.WHITE ? '♕' : '♛';
        const notation = color === Color.WHITE ? 'Q' : 'q';
        const points = 9;
        super(icon, printIcon, notation, points, color, row, col);
    }

    /**
     * Returns an array of valid moves for the Queen.
     * @param {ChessBoardState} chessBoardState
     * @param {boolean} checkIfKingInCheck helps prevent recursion
     * @returns {Array<Array<number>>} array of valid move coordinates.
     */
    validMoves(chessBoardState, checkIfKingInCheck = true) {
        const upLeftMoves = this._validMovesAlongLine(chessBoardState, -1, -1, checkIfKingInCheck);
        const upRightMoves = this._validMovesAlongLine(chessBoardState, -1, 1, checkIfKingInCheck);
        const downLeftMoves = this._validMovesAlongLine(chessBoardState, 1, -1, checkIfKingInCheck)
        const downRightMoves = this._validMovesAlongLine(chessBoardState, 1, 1, checkIfKingInCheck)
        const upMoves = this._validMovesAlongLine(chessBoardState, -1, 0, checkIfKingInCheck);
        const rightMoves = this._validMovesAlongLine(chessBoardState, 0, 1, checkIfKingInCheck);
        const downMoves = this._validMovesAlongLine(chessBoardState, 1, 0, checkIfKingInCheck)
        const leftMoves = this._validMovesAlongLine(chessBoardState, 0, -1, checkIfKingInCheck)
        return [
            ...upMoves, ...rightMoves, ...downMoves, ...leftMoves,
            ...upLeftMoves, ...upRightMoves, ...downLeftMoves, ...downRightMoves
        ];
    }
}

export default Queen;