import Bishop from "./Bishop";
import ChessBoardState from "./ChessBoardState";
import ChessPiece from "./ChessPiece";
import King from "./King";
import Knight from "./Knight";
import Move from "./Move";
import Pawn from "./Pawn";
import Rook from "./Rook";
import Queen from "./Queen";
import Color from "../utils/color";

describe('ChessBoardState.js', () => {
    describe('fromFEN()', () => {
        test('starting location', () => {
            const startingChessBoardState = new ChessBoardState();
            startingChessBoardState.reset();

            // Reset ChessPiece ids for test
            ChessPiece.count = 0;

            const expected = startingChessBoardState;
            const actual = ChessBoardState.fromFEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
            expect(actual).toEqual(expected);
        });

        test('more complex conversion', () => {
            const board = [
                [new Rook(Color.BLACK, 0, 0), new Knight(Color.BLACK, 0, 1), new Bishop(Color.BLACK, 0, 2), null, new Rook(Color.BLACK, 0, 4), null, new King(Color.BLACK, 0, 6), null],
                [new Pawn(Color.BLACK, 1, 0), new Pawn(Color.BLACK, 1, 1), new Pawn(Color.BLACK, 1, 2), null, null, null, new Pawn(Color.BLACK, 1, 6), null],
                [null, null, null, null, null, null, null, null],
                [null, new Bishop(Color.WHITE, 3, 1), null, new Queen(Color.BLACK, 3, 3), new Pawn(Color.BLACK, 3, 4), new Pawn(Color.BLACK, 3, 5), new Pawn(Color.WHITE, 3, 6), new Pawn(Color.BLACK, 3, 7)],
                [null, new Bishop(Color.BLACK, 4, 1), new Queen(Color.WHITE, 4, 2), new Pawn(Color.BLACK, 4, 3), new Knight(Color.WHITE, 4, 4), new Pawn(Color.WHITE, 4, 5), null, null],
                [null, null, null, null, null, null, null, null],
                [new Pawn(Color.WHITE, 6, 0), new Pawn(Color.WHITE, 6, 1), new Pawn(Color.WHITE, 6, 2), new Pawn(Color.WHITE, 6, 3), null, new Knight(Color.WHITE, 6, 5), null, new Pawn(Color.WHITE, 6, 7)],
                [new Rook(Color.WHITE, 7, 0), null, new Bishop(Color.WHITE, 7, 2), null, new King(Color.WHITE, 7, 4), null, null, new Rook(Color.WHITE, 7, 7)],
            ];
            board[7][7].hasMoved = true; // invalidate white king side castle
            board.forEach(rank => {
                rank.forEach(piece => {
                    if (piece !== null) {
                        piece.id = 0;
                    }
                });
            });
            const chessBoardState = new ChessBoardState(board);
            chessBoardState.currentPlayer = Color.WHITE;
            chessBoardState.availableCastles = 'Q';
            chessBoardState.enPassantTarget = 'f6';
            chessBoardState.halfMoveClock = 0;
            chessBoardState.fullMoveNumber = 16;

            const expected = chessBoardState;
            const actual = ChessBoardState.fromFEN('rnb1r1k1/ppp3p1/8/1B1qppPp/1bQpNP2/8/PPPP1N1P/R1B1K2R w Q f6 0 16');
            actual.board.forEach(rank => {
                rank.forEach(piece => {
                    if (piece !== null) {
                        piece.id = 0;
                    }
                });
            });

            expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
        });
    });

    describe('toFEN()', () => {
        test('starting location', () => {
            const chessBoardState = new ChessBoardState();
            chessBoardState.reset();

            const expected = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
            const actual = chessBoardState.toFEN();
            expect(actual).toEqual(expected);
        });

        test('incremental moves', () => {
            const chessBoardState = new ChessBoardState();
            chessBoardState.reset();

            let expected = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
            let actual = chessBoardState.toFEN();
            expect(actual).toEqual(expected);

            const whitePawn = chessBoardState.get(6, 4);
            const white2Spaces = whitePawn.validMoves(chessBoardState)[1];
            white2Spaces.execute(chessBoardState);
            expected = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1';
            actual = chessBoardState.toFEN();
            expect(actual).toEqual(expected);

            const blackPawn = chessBoardState.get(1, 2);
            const black2Spaces = blackPawn.validMoves(chessBoardState)[1];
            black2Spaces.execute(chessBoardState);
            expected = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2';
            actual = chessBoardState.toFEN();
            expect(actual).toEqual(expected);

            new Move([7, 6], [5, 5]).execute(chessBoardState);
            expected = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2';
            actual = chessBoardState.toFEN();
            expect(actual).toEqual(expected);
        });
    });
});