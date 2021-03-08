import { cloneDeep } from 'lodash';

import Bishop from './Bishop';
import Knight from './Knight';
import Pawn from './Pawn';
import Rook from './Rook';
import Queen from './Queen';
import King from './King';
import ChessPiece from './ChessPiece';
import Move from './Move';
import { fileRank2RowCol, rowCol2FileRank } from '../utils/board';
import Color from '../utils/color';

/**
 * Handles the state of the chess board and its pieces.
 */
class ChessBoardState {
    constructor() {
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
        this.currentPlayer = Color.WHITE;
        this.availableCastles = '-';
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
     * Returns the piece at (file, rank).
     * @param {string} fileRank
     */
    getFileRank(fileRank) {
        const [row, col] = fileRank2RowCol(fileRank);
        return this.board[row][col];
    }

    /**
     * Returns whether (file, rank) occupied by piece
     * @param {string} fileRank
     */
    fileRankOccupied(fileRank) {
        const [row, col] = fileRank2RowCol(fileRank);
        return this.board[row][col] !== null;
    }

    /**
     * Sets the piece at (file, rank).
     * @param {string} fileRank
     * @param {ChessPiece} piece
     */
    setFileRank(fileRank, piece) {
        const [row, col] = fileRank2RowCol(fileRank);
        this.board[row][col] = piece;
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
     * Execute move.
     * @param {Move} move
     */
    move(move) {
        const [fromR, fromC] = fileRank2RowCol(move.from);
        const [toR, toC] = fileRank2RowCol(move.to);

        // Move piece
        const piece = this.board[fromR][fromC];
        this.board[fromR][fromC] = null;
        this.board[toR][toC] = piece;
        piece.move(toR, toC);

        // Promotion
        switch (move.promotion) {
            case 'q':
                this.board[toR][toC] = new Queen(this.currentPlayer, toR, toC);
                break;
            case 'r':
                this.board[toR][toC] = new Rook(this.currentPlayer, toR, toC);
                break;
            case 'b':
                this.board[toR][toC] = new Bishop(this.currentPlayer, toR, toC);
                break;
            case 'n':
                this.board[toR][toC] = new Knight(this.currentPlayer, toR, toC);
                break;
            case null:
                // no promotion
                break;
            default:
                throw new Error('Invalid promotion value, should be /[qrbn]/');
        }

        // En passant (capture)
        if (piece instanceof Pawn && move.to === this.enPassantTarget) {
            if (piece.color === Color.WHITE) {
                this.board[toR + 1][toC] = null;
            } else if (piece.color === Color.BLACK) {
                this.board[toR - 1][toC] = null;
            }
        }

        // En passant (set)
        if (piece instanceof Pawn && Math.abs(fromR - toR) === 2) {
            if (piece.color === Color.WHITE) {
                this.enPassantTarget = rowCol2FileRank([toR + 1, toC]);
            } else if (piece.color === Color.BLACK) {
                this.enPassantTarget = rowCol2FileRank([toR - 1, toC]);
            }
        } else {
            this.enPassantTarget = '-';
        }

        // Castling (move)
        if (piece instanceof King && Math.abs(fromC - toC) === 2) {
            if (piece.color === Color.WHITE) {
                if (move.to === 'g1') {
                    // Kingside
                    const rook = this.getFileRank('h1');
                    this.setFileRank('f1', rook);
                    this.setFileRank('h1', null);
                } else if (move.to === 'c1') {
                    // Queenside
                    const rook = this.getFileRank('a1');
                    this.setFileRank('d1', rook)
                    this.setFileRank('a1', null);
                } else {
                    throw new Error('Invalid white king move');
                }
            } else if (piece.color === Color.BLACK) {
                if (move.to === 'g8') {
                    // Kingside
                    const rook = this.getFileRank('h8');
                    this.setFileRank('f8', rook);
                    this.setFileRank('h8', null);
                } else if (move.to === 'c8') {
                    // Queenside
                    const rook = this.getFileRank('a8');
                    this.setFileRank('d8', rook)
                    this.setFileRank('a8', null);
                } else {
                    throw new Error('Invalid white king move');
                }
            }
        }

        // Castling (invalidate)
        if (piece instanceof King) {
            if (piece.color === Color.WHITE) {
                this.invalidateCastle('KQ');
            } else if (piece.color === Color.BLACK) {
                this.invalidateCastle('kq');
            }
        }
        if (piece instanceof Rook) {
            if (piece.color === Color.WHITE) {
                if (move.from === 'a1') {
                    this.invalidateCastle('Q');
                } else if (move.from === 'h1') {
                    this.invalidateCastle('K');
                }
            } else if (piece.color === Color.BLACK) {
                if (move.from === 'a8') {
                    this.invalidateCastle('q');
                } else if (move.from === 'h8') {
                    this.invalidateCastle('k');
                }
            }
        }

        // Update halfMoveClock
        if (piece instanceof Pawn || piece instanceof King) {
            this.halfMoveClock = 0;
        } else {
            this.halfMoveClock++;
        }

        // Toggle currentPlayer
        this.currentPlayer = this.currentPlayer === Color.WHITE
            ? Color.BLACK
            : Color.WHITE;

        // Update fullMoveNumber
        if (this.currentPlayer === Color.WHITE) {
            this.fullMoveNumber++;
        }
    }

    /**
     * Remove piece from board.
     * @param {number} row
     * @param {number} col
     */
    removePiece(row, col) {
        this.board[row][col] = null;
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

        if (this.availableCastles === '') {
            this.availableCastles = '-';
        }
    }

    /**
     * Returns whether king of given color is currently in check.
     * @param {Color} color
     * @returns {boolean} King currently in check
     */
    kingInCheck(color) {
        const king = this.getPiecesFor(color, King)[0];
        const enemyPieces = this.getPiecesFor(
            color === Color.WHITE ? Color.BLACK : Color.WHITE
        );

        for (let i = 0; i < enemyPieces.length; i++) {
            const enemyPiece = enemyPieces[i];
            const validMoves = enemyPiece.validMoves(this, false);
            const validMovesOnKing = validMoves.filter(
                move => move.to === king.getFileRank()
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
        cloneState.move(move);
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

        if (split.length !== 6) {
            throw new Error('FEN string must have 6 components: [ranks activePlayer availableCastles enPassantTarget halfMoveClock fullMoveNumber]');
        }

        const rankStr = split[0];
        const currentPlayerStr = split[1];
        const availableCastlesStr = split[2];
        const enPassantTargetStr = split[3];
        const halfMoveClockStr = split[4];
        const fullMoveNumberStr = split[5];

        if (rankStr.indexOf('K') === -1 || rankStr.indexOf('k') === -1) {
            throw new Error('Both white and black king must be present');
        }

        const chessBoardState = new ChessBoardState();

        // 1. Ranks
        let ranks = rankStr.split('/');
        if (ranks.length !== 8) {
            throw new RangeError('FEN must contain 8 ranks');
        }
        for (let rank = 0; rank < 8; rank++) {
            let file = 0;
            for (let i = 0; i < ranks[rank].length; i++) {
                const char = ranks[rank][i];

                if ((char >= '1' && char <= '8')
                    || (['P', 'N', 'B', 'R', 'Q', 'K'].includes(char.toUpperCase()))) {
                    // ok
                } else {
                    throw new Error('Invalid rank notation char');
                }

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

            if (file < 7 || file > 8) {
                // Not the best check, could end up with idx 7 or 8, depending on logic
                throw new Error('File must contain 8 pieces');
            }
        }

        // 2. Active Player
        switch (currentPlayerStr) {
            case 'w':
                chessBoardState.currentPlayer = Color.WHITE;
                break;
            case 'b':
                chessBoardState.currentPlayer = Color.BLACK;
                break;
            default:
                throw new Error('Invalid active color notation')
        }

        // 3. Available Castles
        if (!availableCastlesStr.match('(\-|K?Q?k?q?)')) {
            throw new Error('Malformed available castles')
        }
        chessBoardState.availableCastles = availableCastlesStr;

        // 4. En Passant Target
        if (
            (enPassantTargetStr.length === 1 && enPassantTargetStr === '-')
            || (
                enPassantTargetStr.length === 2
                && (enPassantTargetStr[0] >= 'a' && enPassantTargetStr[0] <= 'h')
                && (enPassantTargetStr[1] >= 1 && enPassantTargetStr[1] <= 8)
            )
        ) {
            // ok
        } else {
            throw new Error('Malformed en passant target');
        }
        chessBoardState.enPassantTarget = enPassantTargetStr;

        // 5. Half Move Clock
        if (isNaN(halfMoveClockStr)
            || parseInt(halfMoveClockStr) != halfMoveClockStr
            || parseInt(halfMoveClockStr) < 0) {
            throw new Error('Half Move Clock must be an integer >= 0')
        }
        chessBoardState.halfMoveClock = Number(halfMoveClockStr);

        // 6. Full Move Number
        if (isNaN(fullMoveNumberStr)
            || parseInt(fullMoveNumberStr) != fullMoveNumberStr
            || parseInt(fullMoveNumberStr) < 1) {
            throw new Error('Full Move Number must be a positive integer')
        }
        chessBoardState.fullMoveNumber = Number(fullMoveNumberStr);

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

        fen += ` ${this.availableCastles}`;
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