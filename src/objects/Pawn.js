import ChessBoardState from './ChessBoardState';
import ChessPiece from './ChessPiece';
import Move from './Move';
import Color from '../utils/color';
import Queen from './Queen';

class Pawn extends ChessPiece {
    constructor(color, row, col) {
        const icon = color === Color.WHITE ? '♙' : '♟';
        super(icon, color, row, col);

        this.hasMoved = false;
    }

    /**
     * Move the Pawn to the designated (row, col).
     * @param {number} row
     * @param {number} col
     */
    move(row, col) {
        super.move(row, col);
        this.hasMoved = true;
    }

    /**
     * Returns an array of valid moves for the Pawn.
     * @param {ChessBoardState} chessBoardState
     * @returns {Array<Array<number>>} array of valid move coordinates.
     */
    validMoves(chessBoardState, checkIfKingInCheck = true) {
        const validMoves = [];

        // Movement (1 space)
        if (this.color === Color.WHITE) {
            if (this.row > 0 && chessBoardState.get(this.row - 1, this.col) === null) {
                validMoves.push(new Move([this.row, this.col], [this.row - 1, this.col]));
            }
        }
        else if (this.color === Color.BLACK) {
            if (this.row < 7 && chessBoardState.get(this.row + 1, this.col) === null) {
                validMoves.push(new Move([this.row, this.col], [this.row + 1, this.col]));
            }
        }

        // Movement (2 spaces)
        if (!this.hasMoved) {
            if (this.color === Color.WHITE) {
                if (this.row > 1
                    && chessBoardState.get(this.row - 1, this.col) === null
                    && chessBoardState.get(this.row - 2, this.col) === null) {
                    validMoves.push(new Move([this.row, this.col], [this.row - 2, this.col]));
                }
            } else if (this.color === Color.BLACK) {
                if (this.row < 6
                    && chessBoardState.get(this.row + 1, this.col) === null
                    && chessBoardState.get(this.row + 2, this.col) === null) {
                    validMoves.push(new Move([this.row, this.col], [this.row + 2, this.col]));
                }
            }
        }

        // Take
        if (this.color === Color.WHITE) {
            // Top left
            if (this.row > 0 && this.col > 0) {
                const topLeftPiece = chessBoardState.get(this.row - 1, this.col - 1);
                if (topLeftPiece && topLeftPiece.isEnemyOf(this.color)) {
                    validMoves.push(new Move([this.row, this.col], [this.row - 1, this.col - 1]));
                }
            }
            // Top right
            if (this.row > 0 && this.col < 7) {
                const topRightPiece = chessBoardState.get(this.row - 1, this.col + 1);
                if (topRightPiece && topRightPiece.isEnemyOf(this.color)) {
                    validMoves.push(new Move([this.row, this.col], [this.row - 1, this.col + 1]));
                }
            }
        } else if (this.color === Color.BLACK) {
            // Bottom left
            if (this.row < 7 && this.col > 0) {
                const bottomLeftPiece = chessBoardState.get(this.row + 1, this.col - 1);
                if (bottomLeftPiece && bottomLeftPiece.isEnemyOf(this.color)) {
                    validMoves.push(new Move([this.row, this.col], [this.row + 1, this.col - 1]));
                }
            }
            // Bottom right
            if (this.row < 7 && this.col < 7) {
                const bottomRightPiece = chessBoardState.get(this.row + 1, this.col + 1);
                if (bottomRightPiece && bottomRightPiece.isEnemyOf(this.color)) {
                    validMoves.push(new Move([this.row, this.col], [this.row + 1, this.col + 1]));
                }
            }
        }

        validMoves.forEach(move => {
            move.execute = (chessBoardState) => {
                chessBoardState.move(move);
                // Queen promotion
                const [row, col] = move.coordsAEnd;
                if (row === 0 || row === 7) {
                    chessBoardState.board[row][col] = new Queen(this.color, row, col);
                }
            }
        });

        if (checkIfKingInCheck) {
            return validMoves.filter(move =>
                !chessBoardState.kingWouldBeInCheck(this.color, move)
            );
        }

        return validMoves;
    }
}

export default Pawn;