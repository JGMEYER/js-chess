import Bishop from './Bishop';
import King from './King';
import Knight from './Knight';
import Move from './Move';
import Color from '../utils/color';
import ChessBoardState from '../objects/ChessBoardState';

describe('ChessPiece.js', () => {
    describe('_validMovesAlongLine', () => {
        test('handles check correctly', () => {
            const chessBoardState = ChessBoardState.fromFEN('8/8/8/8/3n4/8/1BK5/8 w - - 0 1')
            const bishop = chessBoardState.getFileRank('b2');
            const validBishopMoves = bishop.validMoves(chessBoardState);
            expect(validBishopMoves).toEqual([new Move([6, 1], [4, 3])]);
        });
    });
});