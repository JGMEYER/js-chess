import ChessBoardState from './ChessBoardState';
import King from './King';
import Knight from './Knight';
import Move from './Move';
import Rook from './Rook';
import Color from '../utils/color';

describe('King.js', () => {

    describe('validMoves()', () => {
        test('white queenside castle', () => {
            const chessBoardState = ChessBoardState.fromFEN('8/8/8/8/8/8/8/R3K2R w KQ - 0 1')
            const king = chessBoardState.getFileRank('e1');
            const leftRook = chessBoardState.getFileRank('a1');
            const move = king.validMoves(chessBoardState)[5];
            chessBoardState.move(move);

            expect(chessBoardState.getFileRank('c1')).toEqual(king);
            expect(chessBoardState.getFileRank('d1')).toEqual(leftRook);
        });

        test('white kingside castle', () => {
            const chessBoardState = ChessBoardState.fromFEN('8/8/8/8/8/8/8/R3K2R w KQ - 0 1')
            const king = chessBoardState.getFileRank('e1');
            const rightRook = chessBoardState.getFileRank('h1');
            const move = king.validMoves(chessBoardState)[6];
            chessBoardState.move(move);

            expect(chessBoardState.getFileRank('g1')).toEqual(king);
            expect(chessBoardState.getFileRank('f1')).toEqual(rightRook);
        });
    });

    describe('canQueenSideCastle()', () => {
        test('2. Neither the king nor the chosen rook has previously moved', () => {
            const chessBoardState = ChessBoardState.fromFEN('8/8/8/8/8/8/8/R3K2R w KQ - 0 1')
            const king = chessBoardState.getFileRank('e1');
            const leftRook = chessBoardState.getFileRank('a1');

            expect(king.canQueenSideCastle(chessBoardState)).toBe(true);

            // Move rook forward and back
            const rookMoveUp = leftRook.validMoves(chessBoardState)[0];
            const rookMoveBack = new Move([6, 0], [7, 0]);
            rookMoveUp.execute(chessBoardState);
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);
            rookMoveBack.execute(chessBoardState);
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);
        });

        test('3. There are no pieces between the king and the chosen rook', () => {
            let chessBoardState = ChessBoardState.fromFEN('8/8/8/8/8/8/8/R3K2R w KQ - 0 1')
            let king = chessBoardState.getFileRank('e1');
            expect(king.canQueenSideCastle(chessBoardState)).toBe(true);

            chessBoardState = ChessBoardState.fromFEN('8/8/8/8/8/8/8/RN2K2R w KQ - 0 1')
            king = chessBoardState.getFileRank('e1');
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);

            chessBoardState = ChessBoardState.fromFEN('8/8/8/8/8/8/8/R1N1K2R w KQ - 0 1')
            king = chessBoardState.getFileRank('e1');
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);

            chessBoardState = ChessBoardState.fromFEN('8/8/8/8/8/8/8/R2NK2R w KQ - 0 1')
            king = chessBoardState.getFileRank('e1');
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);
        });

        test('4. The king is not currently in check', () => {
            const chessBoardState = ChessBoardState.fromFEN('4r3/8/8/8/8/8/8/R3K2R w KQ - 0 1');
            const king = chessBoardState.getFileRank('e1');
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);
        });

        test('5/6. The king would not pass through check or end up in check', () => {
            let chessBoardState = ChessBoardState.fromFEN('3r4/8/8/8/8/8/8/R3K2R w KQ - 0 1');
            let king = chessBoardState.getFileRank('e1');
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);

            chessBoardState = ChessBoardState.fromFEN('2r5/8/8/8/8/8/8/R3K2R w KQ - 0 1');
            king = chessBoardState.getFileRank('e1');
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);
        });
    });

    describe('canKingSideCastle()', () => {
        test('2. Neither the king nor the chosen rook has previously moved', () => {
            const chessBoardState = ChessBoardState.fromFEN('8/8/8/8/8/8/8/R3K2R w KQ - 0 1')
            const king = chessBoardState.getFileRank('e1');
            const rightRook = chessBoardState.getFileRank('h1');

            expect(king.canKingSideCastle(chessBoardState)).toBe(true);

            // Move rook forward and back
            const rookMoveUp = rightRook.validMoves(chessBoardState)[0];
            const rookMoveBack = new Move([6, 7], [7, 7]);
            rookMoveUp.execute(chessBoardState);
            expect(king.canKingSideCastle(chessBoardState)).toBe(false);
            rookMoveBack.execute(chessBoardState);
            expect(king.canKingSideCastle(chessBoardState)).toBe(false);
        });

        test('3. There are no pieces between the king and the chosen rook', () => {
            let chessBoardState = ChessBoardState.fromFEN('8/8/8/8/8/8/8/R3K2R w KQ - 0 1')
            let king = chessBoardState.getFileRank('e1');
            expect(king.canKingSideCastle(chessBoardState)).toBe(true);

            chessBoardState = ChessBoardState.fromFEN('8/8/8/8/8/8/8/R3KN1R w KQ - 0 1')
            king = chessBoardState.getFileRank('e1');
            expect(king.canKingSideCastle(chessBoardState)).toBe(false);

            chessBoardState = ChessBoardState.fromFEN('8/8/8/8/8/8/8/R3K1NR w KQ - 0 1')
            king = chessBoardState.getFileRank('e1');
            expect(king.canKingSideCastle(chessBoardState)).toBe(false);
        });

        test('4. The king is not currently in check', () => {
            const chessBoardState = ChessBoardState.fromFEN('4r3/8/8/8/8/8/8/R3K2R w KQ - 0 1');
            const king = chessBoardState.getFileRank('e1');
            expect(king.canKingSideCastle(chessBoardState)).toBe(false);
        });

        test('5/6. The king would not pass through check or end up in check', () => {
            let chessBoardState = ChessBoardState.fromFEN('5r2/8/8/8/8/8/8/R3K2R w KQ - 0 1');
            let king = chessBoardState.getFileRank('e1');
            expect(king.canKingSideCastle(chessBoardState)).toBe(false);

            chessBoardState = ChessBoardState.fromFEN('6r1/8/8/8/8/8/8/R3K2R w KQ - 0 1');
            king = chessBoardState.getFileRank('e1');
            expect(king.canKingSideCastle(chessBoardState)).toBe(false);
        });
    });
});