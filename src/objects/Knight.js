import ChessBoardState from "./ChessBoardState";
import ChessPiece from "./ChessPiece";
import Move from "./Move";
import Color from "../utils/color";

class Knight extends ChessPiece {
    constructor(color, row, col) {
        const icon = '♞';
        const printIcon = color === Color.WHITE ? '♘' : '♞';
        const notation = color === Color.WHITE ? 'N' : 'n';
        super(icon, printIcon, notation, color, row, col);
    }

    /**
     * Returns an array of valid moves for the Bishop.
     * @param {ChessBoardState} chessBoardState
     * @returns {Array<Array<number>>} array of valid move coordinates.
     */
    validMoves(chessBoardState, checkIfKingInCheck = true) {
        const possibleMoves = [
            this.getMoveRowCol([this.row - 2, this.col - 1]),
            this.getMoveRowCol([this.row - 2, this.col + 1]),
            this.getMoveRowCol([this.row - 1, this.col + 2]),
            this.getMoveRowCol([this.row + 1, this.col + 2]),
            this.getMoveRowCol([this.row + 2, this.col + 1]),
            this.getMoveRowCol([this.row + 2, this.col - 1]),
            this.getMoveRowCol([this.row + 1, this.col - 2]),
            this.getMoveRowCol([this.row - 1, this.col - 2]),
        ];

        let pieceAtTarget = null;
        const validMoves = possibleMoves.filter(move => {
            if (move.to === null) {
                return false;
            }

            pieceAtTarget = chessBoardState.getFileRank(move.to)
            if (!pieceAtTarget) {
                return true;
            }
            else if (pieceAtTarget && pieceAtTarget.isEnemyOf(this.color)) {
                return true;
            }
            return false;
        });

        if (checkIfKingInCheck) {
            return validMoves.filter(move =>
                !chessBoardState.kingWouldBeInCheck(this.color, move)
            );
        }

        return validMoves;
    }
}

export default Knight;