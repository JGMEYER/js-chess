import { cloneDeep } from 'lodash';

import Bishop from './Bishop';
import Knight from './Knight';
import Pawn from './Pawn';
import Rook from './Rook';
import Queen from './Queen';
import King from './King';
import ChessPiece from './ChessPiece';
import Move from './Move';
import Color from '../utils/color';

/**
 * Handles the state of the chess board and its pieces.
 */
class ChessBoardState {
    constructor(board, currentPlayer = Color.WHITE) {
        if (board) {
            this.board = board;
        } else {
            this.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ]
        }
        this.currentPlayer = currentPlayer;
        this.availableCastles = 'KQkq';
        this.enPassantTarget = '-';
        this.halfMoveClock = 0;
        this.fullMoveNumber = 1;
    }

    /**
     * Returns the piece at (row, col).
     * @param {number} row
     * @param {number} col
     */
    get(row, col) {
        return this.board[row][col];
    }

    /**
     * Reset the game board.
     */
    reset() {
        this.board = [
            [new Rook(Color.BLACK, 0, 0), new Knight(Color.BLACK, 0, 1), new Bishop(Color.BLACK, 0, 2), new Queen(Color.BLACK, 0, 3), new King(Color.BLACK, 0, 4), new Bishop(Color.BLACK, 0, 5), new Knight(Color.BLACK, 0, 6), new Rook(Color.BLACK, 0, 7)],
            [new Pawn(Color.BLACK, 1, 0), new Pawn(Color.BLACK, 1, 1), new Pawn(Color.BLACK, 1, 2), new Pawn(Color.BLACK, 1, 3), new Pawn(Color.BLACK, 1, 4), new Pawn(Color.BLACK, 1, 5), new Pawn(Color.BLACK, 1, 6), new Pawn(Color.BLACK, 1, 7)],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [new Pawn(Color.WHITE, 6, 0), new Pawn(Color.WHITE, 6, 1), new Pawn(Color.WHITE, 6, 2), new Pawn(Color.WHITE, 6, 3), new Pawn(Color.WHITE, 6, 4), new Pawn(Color.WHITE, 6, 5), new Pawn(Color.WHITE, 6, 6), new Pawn(Color.WHITE, 6, 7)],
            [new Rook(Color.WHITE, 7, 0), new Knight(Color.WHITE, 7, 1), new Bishop(Color.WHITE, 7, 2), new Queen(Color.WHITE, 7, 3), new King(Color.WHITE, 7, 4), new Bishop(Color.WHITE, 7, 5), new Knight(Color.WHITE, 7, 6), new Rook(Color.WHITE, 7, 7)],
        ]
        this.currentPlayer = Color.WHITE;
        this.availableCastles = 'KQkq';
        this.enPassantTarget = '-';
        this.halfMoveClock = 0;
        this.fullMoveNumber = 1;
    }

    /**
     * Executes move
     * @param {Move} move
     */
    move(move) {
        const [aR1, aC1] = move.coordsAStart;
        const [aR2, aC2] = move.coordsAEnd;
        const pieceA = this.board[aR1][aC1];
        this.board[aR2][aC2] = pieceA;
        this.board[aR1][aC1] = null;
        pieceA.move(aR2, aC2);

        if (pieceA instanceof Pawn || pieceA instanceof King) {
            this.halfMoveClock = 0;
        } else {
            this.halfMoveClock++;
        }

        // Reset en passant
        const enemyColor = this.board[aR2][aC2].color === Color.WHITE ? Color.BLACK : Color.WHITE;
        const pawns = this.getPiecesFor(enemyColor, Pawn);
        pawns.forEach(pawn => pawn.justMoved = false);

        if (move.coordsBStart !== null && move.coordsBEnd !== null) {
            const [bR1, bC1] = move.coordsBStart;
            const [bR2, bC2] = move.coordsBEnd;
            const pieceB = this.board[bR1][bC1];
            this.board[bR2][bC2] = pieceB;
            this.board[bR1][bC1] = null;
            pieceB.move(bR2, bC2);
        }

        this.currentPlayer = this.currentPlayer === Color.WHITE
            ? Color.BLACK
            : Color.WHITE;
        if (this.currentPlayer === Color.WHITE) {
            this.fullMoveNumber++;
        }
    }

    /**
     * Check if castle opportunity available
     * e.g. 'KQkq' -> invalidateCastle('Q') -> returns true
     * e.g. 'Kkq' -> invalidateCastle('KQ') -> returns false
     * @param {string} castleCode
     */
    castleAvailable(castleCode) {
        return this.availableCastles.includes(castleCode);
    }

    /**
     * Invalidate castle opportunity
     * e.g. 'KQkq' -> invalidateCastle('Q') -> 'Kkq'
     * e.g. 'KQkq' -> invalidateCastle('kq') -> 'KQ'
     * @param {string} castleCode
     */
    invalidateCastle(castleCode) {
        this.availableCastles = this.availableCastles.replace(castleCode, '');
    }

    /**
     * Returns whether king of given color is currently in check.
     * @param {Color} color
     * @returns {boolean} King currently in check
     */
    kingInCheck(color) {
        const king = this.getPiecesFor(color).filter(
            piece => piece instanceof King
        )[0];
        const enemyPieces = this.getPiecesFor(
            color === Color.WHITE ? Color.BLACK : Color.WHITE
        );

        for (let i = 0; i < enemyPieces.length; i++) {
            const enemyPiece = enemyPieces[i];
            const validMoves = enemyPiece.validMoves(this, false);
            const validMovesOnKing = validMoves.filter(
                move => move.coordsAEnd[0] === king.row && move.coordsAEnd[1] === king.col
            )
            if (validMovesOnKing.length > 0) {
                return true;
            }
        }

        return false;
    }

    /**
     * Returns whether king of given color is currently in checkmate.
     * @param {Color} color
     * @returns {boolean} King in checkmate
     */
    kingInCheckmate(color) {
        if (!this.kingInCheck(color)) {
            return false;
        }

        const pieces = this.getPiecesFor(color);
        const validMoves = [];
        pieces.forEach(piece => {
            validMoves.push(...piece.validMoves(this));
        });

        return validMoves.length === 0;
    }

    /**
     * Returns whether king of given color would be in check after the given
     * move.
     * @param {Color} color
     * @param {number} r1 row1
     * @param {number} c1 col1
     * @param {number} r2 row2
     * @param {number} c2 col2
     * @returns {boolean} King would be in check
     */
    kingWouldBeInCheck(color, move) {
        const cloneState = cloneDeep(this);
        move.execute(cloneState);
        return cloneState.kingInCheck(color);
    }

    /**
     * Returns an array of all pieces on the board.
     * @returns {Array<ChessPiece>}
     */
    getPieces() {
        const chessPieces = [];
        this.board.forEach(row => {
            row.forEach(piece => {
                if (piece !== null) {
                    chessPieces.push(piece);
                }
            });
        });
        return chessPieces;
    }

    /**
     * Returns an array of all pieces on the board for the given color.
     * @param {Color} color
     * @param {ChessPiece} type Type of piece to filter on
     * @returns {Array<ChessPiece>}
     */
    getPiecesFor(color, type = null) {
        const chessPieces = [];
        this.board.forEach(row => {
            row.forEach(piece => {
                if ((piece !== null && piece.color === color)) {
                    if (type === null || piece instanceof type) {
                        chessPieces.push(piece);
                    }
                }
            });
        });
        return chessPieces;
    }

    /**
     * Generates board state from Forsyth-Edwards Notation.
     * @param {string} fen
     */
    static fromFEN(fen) {
        const split = fen.split(' ');
        const rankStr = split[0];
        const currentPlayerStr = split[1];
        const availableCastlesStr = split[2];
        const enPassantTargetStr = split[3];
        const halfMoveClock = Number(split[4]);
        const fullMoveNumber = Number(split[5]);

        const chessBoardState = new ChessBoardState();

        let ranks = rankStr.split('/');
        if (ranks.length !== 8) {
            throw new RangeError('FEN must contain 8 ranks');
        }
        for (let rank = 0; rank < 8; rank++) {
            let file = 0;
            for (let i = 0; i < ranks[rank].length; i++) {
                const char = ranks[rank][i];

                // Empty spaces, ignore
                if (char >= '1' && char <= '8') {
                    file += Number(char);
                    continue;
                }

                const color = char === char.toUpperCase()
                    ? Color.WHITE
                    : Color.BLACK;
                let piece;
                switch (char.toLowerCase()) {
                    case 'p':
                        piece = new Pawn(color, rank, file);
                        break;
                    case 'n':
                        piece = new Knight(color, rank, file);
                        break;
                    case 'b':
                        piece = new Bishop(color, rank, file);
                        break;
                    case 'r':
                        piece = new Rook(color, rank, file);
                        break;
                    case 'q':
                        piece = new Queen(color, rank, file);
                        break;
                    case 'k':
                        piece = new King(color, rank, file);
                        break;
                    default:
                        throw new Error('Invalid piece notation');
                }

                chessBoardState.board[rank][file] = piece;
                file++;
            }
        }

        switch (currentPlayerStr) {
            case 'w':
                chessBoardState.currentPlayer = Color.WHITE;
                break;
            case 'b':
                chessBoardState.currentPlayer = Color.BLACK;
            default:
                throw new Error('Invalid active color notation')
        }

        chessBoardState.enPassantTarget = enPassantTargetStr;
        chessBoardState.availableCastles = availableCastlesStr;
        chessBoardState.halfMoveClock = halfMoveClock;
        chessBoardState.fullMoveNumber = fullMoveNumber;

        return chessBoardState;
    }

    /**
     * Returns Forsyth–Edwards Notation for board state.
     */
    toFEN() {
        let ranks = [];
        this.board.forEach(rank => {
            let ranksStr = '';
            let emptySpaces = 0;
            rank.forEach(piece => {
                if (piece === null) {
                    emptySpaces++;
                } else {
                    if (emptySpaces) {
                        ranksStr += emptySpaces;
                        emptySpaces = 0;
                    }
                    ranksStr += piece.notation;
                }
            });
            if (emptySpaces) {
                ranksStr += emptySpaces;
            }
            ranks.push(ranksStr);
        });

        let fen = ranks.join('/');

        fen += this.currentPlayer === Color.WHITE ? ' w' : ' b';

        fen += ' ';
        const whiteKing = this.getPiecesFor(Color.WHITE, King)[0];
        if (whiteKing.kingSideCastleAvailable(this)) {
            fen += 'K';
        }
        if (whiteKing.queenSideCastleAvailable(this)) {
            fen += 'Q';
        }
        const blackKing = this.getPiecesFor(Color.BLACK, King)[0];
        if (blackKing.kingSideCastleAvailable(this)) {
            fen += 'k';
        }
        if (blackKing.queenSideCastleAvailable(this)) {
            fen += 'q';
        }

        fen += ` ${this.enPassantTarget}`;
        fen += ` ${this.halfMoveClock}`;
        fen += ` ${this.fullMoveNumber}`;

        return fen;
    }

    /**
     * Pretty print the board state to the console.
     */
    print() {
        let rowStrings = [];
        this.board.forEach(row => {
            let rowString = '';
            row.forEach(piece => {
                rowString += piece === null ? '.' : piece.printIcon;
            })
            rowStrings.push(rowString);
        })
        console.log(rowStrings.join('\n'));
    }
}

export default ChessBoardState;