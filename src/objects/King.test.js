import King from './King';
import Rook from './Rook';
import Color from '../utils/color';
import ChessBoardState from '../objects/ChessBoardState';
import Knight from './Knight';
import Move from './Move';

describe('King.js', () => {

    describe('validMoves()', () => {
        test('white queenside castle', () => {
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
            const move = king.validMoves(chessBoardState)[5];
            chessBoardState.move(move);

            expect(board[7][2]).toEqual(king);
            expect(board[7][3]).toEqual(leftRook);
        });
      
        test('white kingside castle', () => {
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
            const move = king.validMoves(chessBoardState)[6];
            chessBoardState.move(move);

            expect(board[7][6]).toEqual(king);
            expect(board[7][5]).toEqual(rightRook);
        });
    });

    describe('canQueenSideCastle()', () => {
        test('2. Neither the king nor the chosen rook has previously moved', () => {
            const leftRook = new Rook(Color.WHITE, 7, 0);
            const king = new King(Color.WHITE, 7, 4);
            const board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [leftRook, null, null, null, king, null, null, null],
            ]
            const chessBoardState = new ChessBoardState(board);

            expect(king.canQueenSideCastle(chessBoardState)).toBe(true);

            // Move rook forward and back
            chessBoardState.move(new Move([7, 0], [6, 0]));
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);
            chessBoardState.move(new Move([6, 0], [7, 0]));
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);
        });

        test('3. There are no pieces between the king and the chosen rook', () => {
            const leftRook = new Rook(Color.WHITE, 7, 0);
            const king = new King(Color.WHITE, 7, 4);

            const chessBoardState = new ChessBoardState();

            chessBoardState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [leftRook, null, null, null, king, null, null, null],
            ]
            expect(king.canQueenSideCastle(chessBoardState)).toBe(true);

            chessBoardState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [leftRook, new Knight(Color.BLACK, 7, 1), null, null, king, null, null, null],
            ]
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);

            chessBoardState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [leftRook, null, new Knight(Color.BLACK, 7, 2), null, king, null, null, null],
            ]
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);

            chessBoardState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [leftRook, null, null, new Knight(Color.BLACK, 7, 3), king, null, null, null],
            ]
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);
        });

        test('4. The king is not currently in check', () => {
            const leftRook = new Rook(Color.WHITE, 7, 0);
            const king = new King(Color.WHITE, 7, 4);

            const chessBoardState = new ChessBoardState();

            chessBoardState.board = [
                [null, null, null, null, new Rook(Color.BLACK, 0, 4), null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [leftRook, null, null, null, king, null, null, null],
            ]
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);
        });

        test('5/6. The king would not pass through check or end up in check', () => {
            const leftRook = new Rook(Color.WHITE, 7, 0);
            const king = new King(Color.WHITE, 7, 4);

            const chessBoardState = new ChessBoardState();

            chessBoardState.board = [
                [null, null, null, new Rook(Color.BLACK, 0, 3), null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [leftRook, null, null, null, king, null, null, null],
            ]
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);

            chessBoardState.board = [
                [null, null, new Rook(Color.BLACK, 0, 2), null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [leftRook, null, null, null, king, null, null, null],
            ]
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);
        });
    });

    describe('canKingSideCastle()', () => {
        test('2. Neither the king nor the chosen rook has previously moved', () => {
            const rightRook = new Rook(Color.WHITE, 7, 7);
            const king = new King(Color.WHITE, 7, 4);
            const board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, king, null, null, rightRook],
            ]
            const chessBoardState = new ChessBoardState(board);

            expect(king.canKingSideCastle(chessBoardState)).toBe(true);

            // Move rook forward and back
            chessBoardState.move(new Move([7, 7], [6, 7]));
            expect(king.canKingSideCastle(chessBoardState)).toBe(false);
            chessBoardState.move(new Move([6, 7], [7, 7]));
            expect(king.canKingSideCastle(chessBoardState)).toBe(false);
        });

        test('3. There are no pieces between the king and the chosen rook', () => {
            const rightRook = new Rook(Color.WHITE, 7, 7);
            const king = new King(Color.WHITE, 7, 4);

            const chessBoardState = new ChessBoardState();

            chessBoardState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, king, null, null, rightRook],
            ]
            expect(king.canKingSideCastle(chessBoardState)).toBe(true);

            chessBoardState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, king, new Knight(Color.BLACK, 7, 5), null, rightRook],
            ]
            expect(king.canKingSideCastle(chessBoardState)).toBe(false);

            chessBoardState.board = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, king, null, new Knight(Color.BLACK, 7, 5), rightRook],
            ]
            expect(king.canKingSideCastle(chessBoardState)).toBe(false);
        });

        test('4. The king is not currently in check', () => {
            const rightRook = new Rook(Color.WHITE, 7, 7);
            const king = new King(Color.WHITE, 7, 4);

            const chessBoardState = new ChessBoardState();

            chessBoardState.board = [
                [null, null, null, null, new Rook(Color.BLACK, 0, 4), null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, king, null, null, rightRook],
            ]
            expect(king.canQueenSideCastle(chessBoardState)).toBe(false);
        });

        test('5/6. The king would not pass through check or end up in check', () => {
            const rightRook = new Rook(Color.WHITE, 7, 7);
            const king = new King(Color.WHITE, 7, 4);

            const chessBoardState = new ChessBoardState();

            chessBoardState.board = [
                [null, null, null, null, null, new Rook(Color.BLACK, 0, 5), null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, king, null, null, rightRook],
            ]
            expect(king.canKingSideCastle(chessBoardState)).toBe(false);

            chessBoardState.board = [
                [null, null, null, null, null, null, new Rook(Color.BLACK, 0, 6), null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, king, null, null, rightRook],
            ]
            expect(king.canKingSideCastle(chessBoardState)).toBe(false);
        });
    });
});