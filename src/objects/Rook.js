import ChessBoardState from "./ChessBoardState";
import ChessPiece from './ChessPiece';
import Color from '../utils/color';

class Rook extends ChessPiece {
    constructor(color, row, col) {
        const icon = '♜';
        const printIcon = color === Color.WHITE ? '♖' : '♜';
        const notation = color === Color.WHITE ? 'R' : 'r';
        super(icon, printIcon, notation, color, row, col);
    }

    /**
     * Move the Rook to the designated (row, col).
     * @param {number} row
     * @param {number} col
     */
    move(row, col) {
        super.move(row, col);
    }

    /**
     * Returns an array of valid moves for the Rook.
     * @param {ChessBoardState} chessBoardState
     * @returns {Array<Array<number>>} array of valid move coordinates.
     */
    validMoves(chessBoardState, checkIfKingInCheck = true) {
        const upMoves = this._validMovesAlongLine(chessBoardState, -1, 0, checkIfKingInCheck);
        const downMoves = this._validMovesAlongLine(chessBoardState, 1, 0, checkIfKingInCheck)
        const rightMoves = this._validMovesAlongLine(chessBoardState, 0, 1, checkIfKingInCheck);
        const leftMoves = this._validMovesAlongLine(chessBoardState, 0, -1, checkIfKingInCheck)
        const validMoves = [...upMoves, ...rightMoves, ...downMoves, ...leftMoves];

        validMoves.forEach(move => {
            move.execute = (chessBoardState) => {
                const [rowStart, colStart] = move.coordsAStart;

                if (rowStart === 7 && colStart === 7) {
                    chessBoardState.invalidateCastle('K');
                }
                else if (rowStart === 7 && colStart === 0) {
                    chessBoardState.invalidateCastle('Q');
                }
                else if (rowStart === 0 && colStart === 7) {
                    chessBoardState.invalidateCastle('k')
                }
                else if (rowStart === 0 && colStart === 0) {
                    chessBoardState.invalidateCastle('q')
                }

                chessBoardState.move(move);
                chessBoardState.enPassantTarget = '-';
            }
        });

        return validMoves;
    }
}

export default Rook;