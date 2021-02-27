import ChessBoardState from './ChessBoardState';
import King from './King';
import Move from './Move';
import Pawn from './Pawn';
import Color from '../utils/color';

describe('Pawn.js', () => {

    describe('validMoves()', () => {
        test('white en passant on rightmost file', () => {
            const blackKing = new King(Color.BLACK, 0, 4);
            const whiteKing = new King(Color.WHITE, 7, 4);

            const whitePawn = new Pawn(Color.WHITE, 3, 6);
            whitePawn.hasMoved = true;
            const blackPawn = new Pawn(Color.BLACK, 1, 7);

            const chessBoardState = new ChessBoardState();
            chessBoardState.board = [
                [null, null, null, null, blackKing, null, null, null],
                [null, null, null, null, null, null, null, blackPawn],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, whitePawn, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, whiteKing, null, null, null],
            ]

            const blackMove = new Move([1, 7], [3, 7]);
            blackMove.execute(chessBoardState);

            const validWhitePawnMoves = whitePawn.validMoves(chessBoardState);
            expect(validWhitePawnMoves[0].coordsAEnd).toEqual([2, 6]);
            expect(validWhitePawnMoves[1].coordsAEnd).toEqual([2, 7]);
        });
    });

});