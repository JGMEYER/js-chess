import ChessBoardState from "./ChessBoardState";
import ChessPiece from './ChessPiece';
import Color from '../utils/color';

class Rook extends ChessPiece {
    constructor(color, row, col) {
        const icon = color === Color.WHITE ? '♖' : '♜';
        super(icon, color, row, col);
    }

    /**
     * Returns an array of valid moves for the Rook.
     * @param {ChessBoardState} chessBoardState
     * @returns {Array<Array<number>>} array of valid move coordinates.
     */
    validMoves(chessBoardState) {
        const upMoves = this._validMovesAlongLine(chessBoardState, -1, 0);
        const rightMoves = this._validMovesAlongLine(chessBoardState, 0, 1);
        const downMoves = this._validMovesAlongLine(chessBoardState, 1, 0)
        const leftMoves = this._validMovesAlongLine(chessBoardState, 0, -1)
        return [...upMoves, ...rightMoves, ...downMoves, ...leftMoves];
    }
}

export default Rook;