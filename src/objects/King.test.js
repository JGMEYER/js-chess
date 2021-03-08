import ChessBoardState from './ChessBoardState';

describe('King.js', () => {

    describe('validMoves()', () => {
        test('white queenside castle', () => {
            const chessBoardState = ChessBoardState.fromFEN('4k3/8/8/8/8/8/8/R3K2R w KQ - 0 1')
            const king = chessBoardState.getFileRank('e1');
            const leftRook = chessBoardState.getFileRank('a1');
            const move = king.getMoveFileRank('c1');
            chessBoardState.move(move);

            expect(chessBoardState.getFileRank('c1')).toEqual(king);
            expect(chessBoardState.getFileRank('d1')).toEqual(leftRook);
            expect(chessBoardState.toFEN()).toEqual('4k3/8/8/8/8/8/8/2KR3R b - - 0 1');
        });

        test('white kingside castle', () => {
            const chessBoardState = ChessBoardState.fromFEN('4k3/8/8/8/8/8/8/R3K2R w KQ - 0 1')
            const king = chessBoardState.getFileRank('e1');
            const rightRook = chessBoardState.getFileRank('h1');
            const move = king.getMoveFileRank('g1');
            chessBoardState.move(move);

            expect(chessBoardState.getFileRank('g1')).toEqual(king);
            expect(chessBoardState.getFileRank('f1')).toEqual(rightRook);
            expect(chessBoardState.toFEN()).toEqual('4k3/8/8/8/8/8/8/R4RK1 b - - 0 1');
        });
    });

    describe('canQueenSideCastle()', () => {
        test('2. Neither the king nor the chosen rook has previously moved', () => {
            const chessBoardState = ChessBoardState.fromFEN('4k3/8/8/8/8/8/8/R3K2R w KQ - 0 1')
            const king = chessBoardState.getFileRank('e1');
            const leftRook = chessBoardState.getFileRank('a1');

            expect(king.canQueenSideCastle(chessBoardState)).toBe(true);

            // Move rook forward and back
            const rookMoveUp = leftRook.getMoveFileRank('a2');
            chessBoardState.move(rookMoveUp);
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);
            const rookMoveBack = leftRook.getMoveFileRank('a1');
            chessBoardState.move(rookMoveBack);
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);
        });

        test('3. There are no pieces between the king and the chosen rook', () => {
            let chessBoardState = ChessBoardState.fromFEN('4k3/8/8/8/8/8/8/R3K2R w KQ - 0 1')
            let king = chessBoardState.getFileRank('e1');
            expect(king.canQueenSideCastle(chessBoardState)).toBe(true);

            chessBoardState = ChessBoardState.fromFEN('4k3/8/8/8/8/8/8/RN2K2R w KQ - 0 1')
            king = chessBoardState.getFileRank('e1');
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);

            chessBoardState = ChessBoardState.fromFEN('4k3/8/8/8/8/8/8/R1N1K2R w KQ - 0 1')
            king = chessBoardState.getFileRank('e1');
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);

            chessBoardState = ChessBoardState.fromFEN('4k3/8/8/8/8/8/8/R2NK2R w KQ - 0 1')
            king = chessBoardState.getFileRank('e1');
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);
        });

        test('4. The king is not currently in check', () => {
            const chessBoardState = ChessBoardState.fromFEN('4rk2/8/8/8/8/8/8/R3K2R w KQ - 0 1');
            const king = chessBoardState.getFileRank('e1');
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);
        });

        test('5/6. The king would not pass through check or end up in check', () => {
            let chessBoardState = ChessBoardState.fromFEN('3rk3/8/8/8/8/8/8/R3K2R w KQ - 0 1');
            let king = chessBoardState.getFileRank('e1');
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);

            chessBoardState = ChessBoardState.fromFEN('2r1k3/8/8/8/8/8/8/R3K2R w KQ - 0 1');
            king = chessBoardState.getFileRank('e1');
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);
        });
    });

    describe('canKingSideCastle()', () => {
        test('2. Neither the king nor the chosen rook has previously moved', () => {
            const chessBoardState = ChessBoardState.fromFEN('4k3/8/8/8/8/8/8/R3K2R w KQ - 0 1')
            const king = chessBoardState.getFileRank('e1');
            const rightRook = chessBoardState.getFileRank('h1');

            expect(king.canKingSideCastle(chessBoardState)).toBe(true);

            // Move rook forward and back
            const rookMoveUp = rightRook.getMoveFileRank('h2');
            chessBoardState.move(rookMoveUp);
            expect(king.canKingSideCastle(chessBoardState)).toBe(false);
            const rookMoveBack = rightRook.getMoveFileRank('h1');
            chessBoardState.move(rookMoveBack);
            expect(king.canKingSideCastle(chessBoardState)).toBe(false);
        });

        test('3. There are no pieces between the king and the chosen rook', () => {
            let chessBoardState = ChessBoardState.fromFEN('4k3/8/8/8/8/8/8/R3K2R w KQ - 0 1')
            let king = chessBoardState.getFileRank('e1');
            expect(king.canKingSideCastle(chessBoardState)).toBe(true);

            chessBoardState = ChessBoardState.fromFEN('4k3/8/8/8/8/8/8/R3KN1R w KQ - 0 1')
            king = chessBoardState.getFileRank('e1');
            expect(king.canKingSideCastle(chessBoardState)).toBe(false);

            chessBoardState = ChessBoardState.fromFEN('4k3/8/8/8/8/8/8/R3K1NR w KQ - 0 1')
            king = chessBoardState.getFileRank('e1');
            expect(king.canKingSideCastle(chessBoardState)).toBe(false);
        });

        test('4. The king is not currently in check', () => {
            const chessBoardState = ChessBoardState.fromFEN('4rk2/8/8/8/8/8/8/R3K2R w KQ - 0 1');
            const king = chessBoardState.getFileRank('e1');
            expect(king.canKingSideCastle(chessBoardState)).toBe(false);
        });

        test('5/6. The king would not pass through check or end up in check', () => {
            let chessBoardState = ChessBoardState.fromFEN('4kr2/8/8/8/8/8/8/R3K2R w KQ - 0 1');
            let king = chessBoardState.getFileRank('e1');
            expect(king.canKingSideCastle(chessBoardState)).toBe(false);

            chessBoardState = ChessBoardState.fromFEN('4k1r1/8/8/8/8/8/8/R3K2R w KQ - 0 1');
            king = chessBoardState.getFileRank('e1');
            expect(king.canKingSideCastle(chessBoardState)).toBe(false);
        });
    });
});