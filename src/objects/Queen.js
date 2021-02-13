import ChessBoardState from './ChessBoardState';
import ChessPiece from './ChessPiece';
import Color from '../utils/color';

class Queen extends ChessPiece {
    constructor(color, row, col) {
        const icon = color === Color.WHITE ? '♕' : '♛';
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
        const upMoves = this._validMovesAlongLine(chessBoardState, -1, 0);
        const rightMoves = this._validMovesAlongLine(chessBoardState, 0, 1);
        const downMoves = this._validMovesAlongLine(chessBoardState, 1, 0)
        const leftMoves = this._validMovesAlongLine(chessBoardState, 0, -1)
        return [
            ...upMoves, ...rightMoves, ...downMoves, ...leftMoves,
            ...upLeftMoves, ...upRightMoves, ...downLeftMoves, ...downRightMoves
        ];
    }
}

export default Queen;