import ChessBoardState from './ChessBoardState';
import ChessPiece from './ChessPiece';
import Move from './Move';
import Rook from './ChessPiece';
import Color from '../utils/color';

class King extends ChessPiece {
    constructor(color, row, col) {
        const icon = '♚';
        super(icon, color, row, col);

        this.hasMoved = false;
    }

    /**
     * Move the King to the designated (row, col).
     * @param {number} row
     * @param {number} col
     */
    move(row, col) {
        super.move(row, col);
        this.hasMoved = true;
    }

    /**
     * Returns whether king can queenside castle
     * @param {ChessBoardState} chessBoardState
     */
    canQueenSideCastle(chessBoardState) {
        // 1. The castling must be queenside
        let row = this.color === Color.WHITE ? 7 : 0;
        const leftMostPiece = chessBoardState.get(row, 0);
        // 2. Neither the king nor the chosen rook has previously moved
        if (this.hasMoved || leftMostPiece === null || !leftMostPiece instanceof Rook || leftMostPiece.hasMoved) {
            return false;
        }
        // 3. There are no pieces between the king and the chosen rook
        if (
            chessBoardState.get(row, 1) !== null
            || chessBoardState.get(row, 2) !== null
            || chessBoardState.get(row, 3) !== null
        ) {
            return false;
        }
        // 4. The king is not currently in check
        if (chessBoardState.kingInCheck(this.color)) {
            return false;
        }
        // 5/6. The king would not pass through check or end up in check
        if (chessBoardState.kingWouldBeInCheck(this.color, new Move([row, 4], [row, 3]))
            || chessBoardState.kingWouldBeInCheck(this.color, new Move([row, 4], [row, 2]))) {
            return false;
        }

        return true;
    }

    /**
     * Returns whether king can kingside castle
     * @param {ChessBoardState} chessBoardState
     */
    canKingSideCastle(chessBoardState) {
        // 1. The castling must be queenside
        let row = this.color === Color.WHITE ? 7 : 0;
        const rightMostPiece = chessBoardState.get(row, 7);
        // 2. Neither the king nor the chosen rook has previously moved
        if (this.hasMoved || rightMostPiece === null || !rightMostPiece instanceof Rook || rightMostPiece.hasMoved) {
            return false;
        }
        // 3. There are no pieces between the king and the chosen rook
        if (
            chessBoardState.get(row, 5) !== null
            || chessBoardState.get(row, 6) !== null
        ) {
            return false;
        }
        // 4. The king is not currently in check
        if (chessBoardState.kingInCheck(this.color)) {
            return false;
        }
        // 5/6. The king would not pass through check or end up in check
        if (chessBoardState.kingWouldBeInCheck(this.color, new Move([row, 4], [row, 5]))
            || chessBoardState.kingWouldBeInCheck(this.color, new Move([row, 4], [row, 6]))) {
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
            new Move([this.row, this.col], [this.row - 1, this.col]),
            new Move([this.row, this.col], [this.row - 1, this.col + 1]),
            new Move([this.row, this.col], [this.row, this.col + 1]),
            new Move([this.row, this.col], [this.row + 1, this.col + 1]),
            new Move([this.row, this.col], [this.row + 1, this.col]),
            new Move([this.row, this.col], [this.row + 1, this.col - 1]),
            new Move([this.row, this.col], [this.row, this.col - 1]),
            new Move([this.row, this.col], [this.row - 1, this.col - 1]),
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
            if (this.canQueenSideCastle(chessBoardState)) {
                let row = this.color === Color.WHITE ? 7 : 0;
                validMoves.push(new Move(
                    [row, 4], [row, 2], // king
                    [row, 0], [row, 3], // left rook
                ));
            }

            if (this.canKingSideCastle(chessBoardState)) {
                let row = this.color === Color.WHITE ? 7 : 0;
                validMoves.push(new Move(
                    [row, 4], [row, 6], // king
                    [row, 7], [row, 5], // right rook
                ));
            }

            return validMoves.filter(move =>
                !chessBoardState.kingWouldBeInCheck(this.color, move)
            );
        }

        return validMoves;
    }
}

export default King;