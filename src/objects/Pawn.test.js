import ChessBoardState from './ChessBoardState';
import King from './King';
import Pawn from './Pawn';
import Color from '../utils/color';

describe('Pawn.js', () => {

    describe('validMoves()', () => {
        test('white en passant on rightmost file', () => {
            const chessBoardState = ChessBoardState.fromFEN('4k3/7p/8/6P1/8/8/8/4K3 w - - 0 1');
            const whitePawn = chessBoardState.getFileRank('g5');
            const blackPawn = chessBoardState.getFileRank('h7');

            const black2Spaces = blackPawn.validMoves(chessBoardState)[1];
            chessBoardState.move(black2Spaces);

            const validWhitePawnMoves = whitePawn.validMoves(chessBoardState);
            expect(validWhitePawnMoves[0].to).toEqual('g6');
            expect(validWhitePawnMoves[1].to).toEqual('h6');
        });
    });

});