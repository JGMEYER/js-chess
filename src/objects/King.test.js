import King from './King';
import Rook from './Rook';
import Color from '../utils/color';
import ChessBoardState from '../objects/ChessBoardState';

describe('King.js', () => {
    describe('validMoves()', () => {
        test('white queen-side castle', () => {
            const leftRook = new Rook(Color.WHITE, 7, 0);
            const king = new King(Color.WHITE, 7, 4);
            const rightRook = new Rook(Color.WHITE, 7, 7);
            const board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [leftRook, null, null, null, king, null, null, rightRook],
            ]
            const chessBoardState = new ChessBoardState(board);
            const move = king.validMoves()[5];
            chessBoardState.move(move);

            expect(board[7, 2]).toEqual(king);
            expect(board[7, 3]).toEqual(leftRook);
        });
    });
});