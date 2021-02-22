import Bishop from './Bishop';
import King from './King';
import Knight from './Knight';
import Move from './Move';
import Color from '../utils/color';
import ChessBoardState from '../objects/ChessBoardState';

describe('ChessPiece.js', () => {
    describe('_validMovesAlongLine', () => {
        test('handles check correctly', () => {
            const board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, new Knight(Color.BLACK, 4, 3), null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, new Bishop(Color.WHITE, 6, 1), new King(Color.WHITE, 6, 2), null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ]
            const chessBoardState = new ChessBoardState(board);
            const bishop = board[6][1];
            const validBishopMoves = bishop.validMoves(chessBoardState);
            expect(validBishopMoves).toEqual([new Move([6, 1], [4, 3])]);
        });
    });
});