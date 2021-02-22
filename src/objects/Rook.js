import ChessBoardState from "./ChessBoardState";
import ChessPiece from './ChessPiece';
import Color from '../utils/color';

class Rook extends ChessPiece {
    constructor(color, row, col) {
        const icon = color === Color.WHITE ? '♖' : '♜';
        super(icon, color, row, col);

        this.hasMoved = false;
    }

    /**
     * Move the Rook to the designated (row, col).
     * @param {number} row
     * @param {number} col
     */
    move(row, col) {
        super.move(row, col);
        this.hasMoved = true;
    }

    /**
     * Returns an array of valid moves for the Rook.
     * @param {ChessBoardState} chessBoardState
     * @returns {Array<Array<number>>} array of valid move coordinates.
     */
    validMoves(chessBoardState, checkIfKingInCheck = true) {
        const upMoves = this._validMovesAlongLine(chessBoardState, -1, 0, checkIfKingInCheck);
        const rightMoves = this._validMovesAlongLine(chessBoardState, 0, 1, checkIfKingInCheck);
        const downMoves = this._validMovesAlongLine(chessBoardState, 1, 0, checkIfKingInCheck)
        const leftMoves = this._validMovesAlongLine(chessBoardState, 0, -1, checkIfKingInCheck)
        return [...upMoves, ...rightMoves, ...downMoves, ...leftMoves];
    }
}

export default Rook;