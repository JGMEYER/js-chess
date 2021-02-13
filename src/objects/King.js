import ChessBoardState from './ChessBoardState';
import ChessPiece from './ChessPiece';
import Color from '../utils/color';

class King extends ChessPiece {
    constructor(color, row, col) {
        const icon = color === Color.WHITE ? '♔' : '♚';
        super(icon, color, row, col);
    }

    /**
     * Returns an array of valid moves for the King.
     * @param {ChessBoardState} chessBoardState
     * @returns {Array<Array<number>>} array of valid move coordinates.
     */
    validMoves(chessBoardState) {
        const possibleMoves = [
            [this.row - 1, this.col],
            [this.row - 1, this.col + 1],
            [this.row, this.col + 1],
            [this.row + 1, this.col + 1],
            [this.row + 1, this.col],
            [this.row + 1, this.col - 1],
            [this.row, this.col - 1],
            [this.row - 1, this.col - 1],
        ];

        let pieceAtTarget = null;
        const validMoves = possibleMoves.filter(move => {
            const [row, col] = move;
            if (row < 0 || row > 7 || col < 0 || col > 7) {
                return false;
            }
            pieceAtTarget = chessBoardState.get(row, col)
            if (!pieceAtTarget) {
                return true;
            }
            else if (pieceAtTarget && pieceAtTarget.isEnemyOf(this.color)) {
                return true;
            }
            return false;
        });

        return validMoves;
    }
}

export default King;