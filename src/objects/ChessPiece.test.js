import ChessBoardState from '../objects/ChessBoardState';

describe('ChessPiece.js', () => {
    describe('_validMovesAlongLine', () => {
        test('handles check correctly', () => {
            // Knows bishop must take knight
            let chessBoardState = ChessBoardState.fromFEN('k7/8/8/8/3n4/8/1BK5/8 w - - 0 1')
            const bishop = chessBoardState.getFileRank('b2');
            const validBishopMoves = bishop.validMoves(chessBoardState);
            expect(validBishopMoves).toEqual([bishop.getMoveFileRank('d4')]);

            // Knows bishop cannot take pawn, leaving king in check
            chessBoardState = ChessBoardState.fromFEN('r3kbnr/pp2pppp/8/4n3/6b1/4B3/PPP1qP1P/RN2K2R w KQkq - 5 11');
            const whiteBishop = chessBoardState.getFileRank('e3');
            const validWhiteBishopMoves = whiteBishop.validMoves(chessBoardState);
            expect(validWhiteBishopMoves).toEqual([]);

            // Does not simulate taking own king (results in error, otherwise)
            chessBoardState = ChessBoardState.fromFEN('rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq d6 0 2');
            const whiteQueen = chessBoardState.getFileRank('d1');
            const validWhiteQueenMoves = whiteQueen.validMoves(chessBoardState);
            expect(validWhiteQueenMoves).toEqual([
                whiteQueen.getMoveFileRank('d2'),
                whiteQueen.getMoveFileRank('d3'),
            ]);
        });
    });
});