import ChessBoardState from '../objects/ChessBoardState';

describe('ChessPiece.js', () => {
    describe('_validMovesAlongLine', () => {
        test('handles check correctly', () => {
            const chessBoardState = ChessBoardState.fromFEN('k7/8/8/8/3n4/8/1BK5/8 w - - 0 1')
            const bishop = chessBoardState.getFileRank('b2');
            const validBishopMoves = bishop.validMoves(chessBoardState);
            expect(validBishopMoves).toEqual([bishop.getMoveFileRank('d4')]);
        });
    });
});