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
        super(icon, printIcon, notation, color, row, col);
    }

    /**
     * Returns whether the pawn has already moved.
     */
    hasMoved() {
        return (this.color === Color.WHITE && this.row !== 6)
            || (this.color === Color.BLACK && this.row !== 1);
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
        if (!this.hasMoved()) {
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

        const leftPiece = chessBoardState.get(this.row, this.col - 1);
        const rightPiece = chessBoardState.get(this.row, this.col + 1);

        // Take
        if (this.color === Color.WHITE) {
            // Top left
            if (this.row > 0 && this.col > 0) {
                const topLeftPiece = chessBoardState.get(this.row - 1, this.col - 1);
                if (topLeftPiece && topLeftPiece.isEnemyOf(this.color)) {
                    validMoves.push(new Move([this.row, this.col], [this.row - 1, this.col - 1]));
                } else if (chessBoardState.enPassantTarget === rowCol2FileRank([this.row - 1, this.col - 1])) {
                    // En passant
                    validMoves.push(new Move([this.row, this.col], [this.row - 1, this.col - 1]));
                }
            }
            // Top right
            if (this.row > 0 && this.col < 7) {
                const topRightPiece = chessBoardState.get(this.row - 1, this.col + 1);
                if (topRightPiece && topRightPiece.isEnemyOf(this.color)) {
                    validMoves.push(new Move([this.row, this.col], [this.row - 1, this.col + 1]));
                } else if (chessBoardState.enPassantTarget === rowCol2FileRank([this.row - 1, this.col + 1])) {
                    // En passant
                    validMoves.push(new Move([this.row, this.col], [this.row - 1, this.col + 1]));
                }
            }
        } else if (this.color === Color.BLACK) {
            // Bottom left
            if (this.row < 7 && this.col > 0) {
                const bottomLeftPiece = chessBoardState.get(this.row + 1, this.col - 1);
                if (bottomLeftPiece && bottomLeftPiece.isEnemyOf(this.color)) {
                    validMoves.push(new Move([this.row, this.col], [this.row + 1, this.col - 1]));
                } else if (chessBoardState.enPassantTarget === rowCol2FileRank([this.row + 1, this.col - 1])) {
                    // En passant
                    validMoves.push(new Move([this.row, this.col], [this.row + 1, this.col - 1]));
                }
            }
            // Bottom right
            if (this.row < 7 && this.col < 7) {
                const bottomRightPiece = chessBoardState.get(this.row + 1, this.col + 1);
                if (bottomRightPiece && bottomRightPiece.isEnemyOf(this.color)) {
                    validMoves.push(new Move([this.row, this.col], [this.row + 1, this.col + 1]));
                } else if (chessBoardState.enPassantTarget === rowCol2FileRank([this.row + 1, this.col + 1])) {
                    // En passant
                    validMoves.push(new Move([this.row, this.col], [this.row + 1, this.col + 1]));
                }
            }
        }

        validMoves.forEach(move => {
            move.execute = (chessBoardState) => {
                const [rowStart, colStart] = move.coordsAStart;
                const [row, col] = move.coordsAEnd;

                // En passant
                if (chessBoardState.enPassantTarget === rowCol2FileRank([row, col])) {
                    if (this.color === Color.WHITE) {
                        chessBoardState.board[row + 1][col] = null;
                    } else if (this.color === Color.BLACK) {
                        chessBoardState.board[row - 1][col] = null;
                    }
                }

                chessBoardState.move(move);

                if (Math.abs(rowStart - row) === 2) {
                    // Moved 2 spaces, mark for en passant
                    if (this.color === Color.WHITE) {
                        chessBoardState.enPassantTarget = rowCol2FileRank([row + 1, col]);
                    } else if (this.color === Color.BLACK) {
                        chessBoardState.enPassantTarget = rowCol2FileRank([row - 1, col]);
                    }
                } else {
                    // Reset enPassantTarget
                    chessBoardState.enPassantTarget = '-';
                }

                // Queen promotion
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