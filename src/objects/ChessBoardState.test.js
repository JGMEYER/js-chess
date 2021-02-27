import ChessBoardState from "./ChessBoardState";
import Move from "./Move";

describe('ChessBoardState.js', () => {
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

            // new Move([6, 4], [4, 4]).execute(chessBoardState);
            // expected = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1';
            // actual = chessBoardState.toFEN();
            // expect(expected).toEqual(actual);
        });
    });
});