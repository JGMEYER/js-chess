import ChessBoardState from './ChessBoardState';
import ChessPiece from './ChessPiece';
import Move from './Move';
import Queen from './Queen';
import { rowCol2FileRank } from '../utils/board';
import Color from '../utils/color';

class Pawn extends ChessPiece {
    constructor(color, row, col) {
        const icon = '♟';
        const printIcon = color === Color.WHITE ? '♙' : '♟';
        const notation = color === Color.WHITE ? 'P' : 'p';
        const points = 1;
        super(icon, printIcon, notation, points, color, row, col);
    }

    /**
     * Returns whether the pawn has already moved.
     */
    hasMoved() {
        return (this.color === Color.WHITE && this.row !== 6)
            || (this.color === Color.BLACK && this.row !== 1);
    }

    /**
     * Overrides parent getMove to allow for promotion.
     * @param {Array<number>} to [row, col]
     */
    getMoveRowCol(toRowCol) {
        const [row, col] = toRowCol;
        // Queen promotion
        const promotion = (row === 0 || row === 7) ? 'q' : null;
        return super.getMoveRowCol(toRowCol, promotion);
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
                validMoves.push(this.getMoveRowCol([this.row - 1, this.col]));
            }
        }
        else if (this.color === Color.BLACK) {
            if (this.row < 7 && chessBoardState.get(this.row + 1, this.col) === null) {
                validMoves.push(this.getMoveRowCol([this.row + 1, this.col]));
            }
        }

        // Movement (2 spaces)
        if (!this.hasMoved()) {
            if (this.color === Color.WHITE) {
                if (this.row > 1
                    && chessBoardState.get(this.row - 1, this.col) === null
                    && chessBoardState.get(this.row - 2, this.col) === null) {
                    validMoves.push(this.getMoveRowCol([this.row - 2, this.col]));
                }
            } else if (this.color === Color.BLACK) {
                if (this.row < 6
                    && chessBoardState.get(this.row + 1, this.col) === null
                    && chessBoardState.get(this.row + 2, this.col) === null) {
                    validMoves.push(this.getMoveRowCol([this.row + 2, this.col]));
                }
            }
        }

        const leftPiece = chessBoardState.get(this.row, this.col - 1);
        const rightPiece = chessBoardState.get(this.row, this.col + 1);

        // Take
        if (this.color === Color.WHITE) {
            // Top left
            if (this.row > 0 && this.col > 0) {
                const topLeftPiece = chessBoardState.get(this.row - 1, this.col - 1);
                if (topLeftPiece && topLeftPiece.isEnemyOf(this.color)) {
                    validMoves.push(this.getMoveRowCol([this.row - 1, this.col - 1]));
                } else if (chessBoardState.enPassantTarget === rowCol2FileRank([this.row - 1, this.col - 1])) {
                    // En passant
                    validMoves.push(this.getMoveRowCol([this.row - 1, this.col - 1]));
                }
            }
            // Top right
            if (this.row > 0 && this.col < 7) {
                const topRightPiece = chessBoardState.get(this.row - 1, this.col + 1);
                if (topRightPiece && topRightPiece.isEnemyOf(this.color)) {
                    validMoves.push(this.getMoveRowCol([this.row - 1, this.col + 1]));
                } else if (chessBoardState.enPassantTarget === rowCol2FileRank([this.row - 1, this.col + 1])) {
                    // En passant
                    validMoves.push(this.getMoveRowCol([this.row - 1, this.col + 1]));
                }
            }
        } else if (this.color === Color.BLACK) {
            // Bottom left
            if (this.row < 7 && this.col > 0) {
                const bottomLeftPiece = chessBoardState.get(this.row + 1, this.col - 1);
                if (bottomLeftPiece && bottomLeftPiece.isEnemyOf(this.color)) {
                    validMoves.push(this.getMoveRowCol([this.row + 1, this.col - 1]));
                } else if (chessBoardState.enPassantTarget === rowCol2FileRank([this.row + 1, this.col - 1])) {
                    // En passant
                    validMoves.push(this.getMoveRowCol([this.row + 1, this.col - 1]));
                }
            }
            // Bottom right
            if (this.row < 7 && this.col < 7) {
                const bottomRightPiece = chessBoardState.get(this.row + 1, this.col + 1);
                if (bottomRightPiece && bottomRightPiece.isEnemyOf(this.color)) {
                    validMoves.push(this.getMoveRowCol([this.row + 1, this.col + 1]));
                } else if (chessBoardState.enPassantTarget === rowCol2FileRank([this.row + 1, this.col + 1])) {
                    // En passant
                    validMoves.push(this.getMoveRowCol([this.row + 1, this.col + 1]));
                }
            }
        }

        if (checkIfKingInCheck) {
            return validMoves.filter(move => {
                return !chessBoardState.kingWouldBeInCheck(this.color, move)
            });
        }

        return validMoves;
    }
}

export default Pawn;