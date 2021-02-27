import ChessBoardState from "./ChessBoardState";
import ChessPiece from "./ChessPiece";
import Move from "./Move";

describe('ChessBoardState.js', () => {
    describe('fromFEN()', () => {
        test('starting location', () => {
            const startingChessBoardState = new ChessBoardState();
            startingChessBoardState.reset();

            // Reset ChessPiece ids for test
            ChessPiece.count = 0;

            const expected = startingChessBoardState;
            const actual = ChessBoardState.fromFEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
            expect(expected).toEqual(actual);
        });

        test('more complex conversion', () => {

        });
    });

    describe('toFEN()', () => {
        test('starting location', () => {
            const chessBoardState = new ChessBoardState();
            chessBoardState.reset();

            const expected = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
            const actual = chessBoardState.toFEN();
            expect(expected).toEqual(actual);
        });

        test('incremental moves', () => {
            const chessBoardState = new ChessBoardState();
            chessBoardState.reset();

            let expected = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
            let actual = chessBoardState.toFEN();
            expect(expected).toEqual(actual);

            const whitePawn = chessBoardState.get(6, 4);
            const white2Spaces = whitePawn.validMoves(chessBoardState)[1];
            white2Spaces.execute(chessBoardState);
            expected = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1';
            actual = chessBoardState.toFEN();
            expect(expected).toEqual(actual);

            const blackPawn = chessBoardState.get(1, 2);
            const black2Spaces = blackPawn.validMoves(chessBoardState)[1];
            black2Spaces.execute(chessBoardState);
            expected = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2';
            actual = chessBoardState.toFEN();
            expect(expected).toEqual(actual);

            new Move([7, 6], [5, 5]).execute(chessBoardState);
            expected = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2';
            actual = chessBoardState.toFEN();
            expect(expected).toEqual(actual);
        });
    });
});