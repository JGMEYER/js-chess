import ChessBoardState from './ChessBoardState';
import ChessPiece from './ChessPiece';
import Move from './Move';
import Rook from './ChessPiece';
import Color from '../utils/color';

class King extends ChessPiece {
    constructor(color, row, col) {
        const icon = '♚';
        const printIcon = color === Color.WHITE ? '♔' : '♚';
        const notation = color === Color.WHITE ? 'K' : 'k';
        super(icon, printIcon, notation, color, row, col);
    }

    /**
     * Move the King to the designated (row, col).
     * @param {number} row
     * @param {number} col
     */
    move(row, col) {
        super.move(row, col);
    }

    /**
     * Returns whether queenside castle still available.
     * @param {ChessBoardState} chessBoardState
     */
    queenSideCastleAvailable(chessBoardState) {
        const codeToMatch = this.color === Color.WHITE ? 'Q' : 'q';
        return chessBoardState.castleAvailable(codeToMatch);
    }

    /**
     * Returns whether king can queenside castle
     * @param {ChessBoardState} chessBoardState
     */
    canQueenSideCastle(chessBoardState) {
        // 1. The castling must be queenside
        let rank = this.color === Color.WHITE ? 1 : 8;
        // 2. Neither the king nor the chosen rook has previously moved
        if (!this.queenSideCastleAvailable(chessBoardState)) {
            return false;
        }
        // 3. There are no pieces between the king and the chosen rook
        if (
            chessBoardState.fileRankOccupied(`b${rank}`)
            || chessBoardState.fileRankOccupied(`c${rank}`)
            || chessBoardState.fileRankOccupied(`d${rank}`)
        ) {
            return false;
        }
        // 4. The king is not currently in check
        if (chessBoardState.kingInCheck(this.color)) {
            return false;
        }
        // 5/6. The king would not pass through check or end up in check
        if (chessBoardState.kingWouldBeInCheck(this.color, this.getMoveFileRank(`d${rank}`))
            || chessBoardState.kingWouldBeInCheck(this.color, this.getMoveFileRank(`c${rank}`))) {
            return false
        }

        return true;
    }

    /**
     * Returns whether kingside castle still available.
     * @param {ChessBoardState} chessBoardState
     */
    kingSideCastleAvailable(chessBoardState) {
        const codeToMatch = this.color === Color.WHITE ? 'K' : 'k';
        return chessBoardState.castleAvailable(codeToMatch);
    }

    /**
     * Returns whether king can kingside castle
     * @param {ChessBoardState} chessBoardState
     */
    canKingSideCastle(chessBoardState) {
        // 1. The castling must be queenside
        let rank = this.color === Color.WHITE ? 1 : 8;
        // 2. Neither the king nor the chosen rook has previously moved
        if (!this.kingSideCastleAvailable(chessBoardState)) {
            return false;
        }
        // 3. There are no pieces between the king and the chosen rook
        if (
            chessBoardState.fileRankOccupied(`f${rank}`)
            || chessBoardState.fileRankOccupied(`g${rank}`)
        ) {
            return false;
        }
        // 4. The king is not currently in check
        if (chessBoardState.kingInCheck(this.color)) {
            return false;
        }
        // 5/6. The king would not pass through check or end up in check
        if (chessBoardState.kingWouldBeInCheck(this.color, this.getMoveFileRank(`f${rank}`))
            || chessBoardState.kingWouldBeInCheck(this.color, this.getMoveFileRank(`g${rank}`))) {
            return false;
        }

        return true;
    }

    /**
     * Returns an array of valid moves for the King.
     * @param {ChessBoardState} chessBoardState
     * @param {boolean} checkIfKingInCheck helps prevent recursion
     * @returns {Array<Array<number>>} array of valid move coordinates.
     */
    validMoves(chessBoardState, checkIfKingInCheck = true) {
        const possibleMoves = [
            this.getMoveRowCol([this.row - 1, this.col]),
            this.getMoveRowCol([this.row - 1, this.col + 1]),
            this.getMoveRowCol([this.row, this.col + 1]),
            this.getMoveRowCol([this.row + 1, this.col + 1]),
            this.getMoveRowCol([this.row + 1, this.col]),
            this.getMoveRowCol([this.row + 1, this.col - 1]),
            this.getMoveRowCol([this.row, this.col - 1]),
            this.getMoveRowCol([this.row - 1, this.col - 1]),
        ];

        let pieceAtTarget = null;
        const validMoves = possibleMoves.filter(move => {
            if (move.to === null) {
                return false;
            }

            pieceAtTarget = chessBoardState.getFileRank(move.to);
            if (!pieceAtTarget) {
                return true;
            }
            else if (pieceAtTarget && pieceAtTarget.isEnemyOf(this.color)) {
                return true;
            }
            return false;
        });

        if (checkIfKingInCheck) {
            const rank = this.color === Color.WHITE ? 1 : 8;
            if (this.canQueenSideCastle(chessBoardState)) {
                validMoves.push(this.getMoveFileRank(`c${rank}`));
            }
            if (this.canKingSideCastle(chessBoardState)) {
                validMoves.push(this.getMoveFileRank(`g${rank}`));
            }
        }

        if (checkIfKingInCheck) {
            return validMoves.filter(move =>
                !chessBoardState.kingWouldBeInCheck(this.color, move)
            );
        }

        return validMoves;
    }
}

export default King;