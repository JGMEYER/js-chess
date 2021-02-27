import ChessBoardState from "./ChessBoardState";
import ChessPiece from "./ChessPiece";
import Move from "./Move";
import Color from "../utils/color";

class Knight extends ChessPiece {
    constructor(color, row, col) {
        const icon = '♞';
        const notation = color === Color.WHITE ? 'N' : 'n';
        super(icon, notation, color, row, col);
    }

    /**
     * Returns an array of valid moves for the Bishop.
     * @param {ChessBoardState} chessBoardState
     * @returns {Array<Array<number>>} array of valid move coordinates.
     */
    validMoves(chessBoardState, checkIfKingInCheck = true) {
        const possibleMoves = [
            new Move([this.row, this.col], [this.row - 2, this.col - 1]),
            new Move([this.row, this.col], [this.row - 2, this.col + 1]),
            new Move([this.row, this.col], [this.row - 1, this.col + 2]),
            new Move([this.row, this.col], [this.row + 1, this.col + 2]),
            new Move([this.row, this.col], [this.row + 2, this.col + 1]),
            new Move([this.row, this.col], [this.row + 2, this.col - 1]),
            new Move([this.row, this.col], [this.row + 1, this.col - 2]),
            new Move([this.row, this.col], [this.row - 1, this.col - 2]),
        ];

        let pieceAtTarget = null;
        const validMoves = possibleMoves.filter(move => {
            const [row, col] = move.coordsAEnd;
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

        if (checkIfKingInCheck) {
            return validMoves.filter(move =>
                !chessBoardState.kingWouldBeInCheck(this.color, move)
            );
        }

        return validMoves;
    }
}

export default Knight;