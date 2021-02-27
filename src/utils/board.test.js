import { rowCol2FileRank, fileRank2RowCol } from './board.js';

describe('board.js', () => {
    describe('rowCol2FileRank', () => {
        test('works', () => {
            expect(rowCol2FileRank([1, 5])).toEqual('f7');
            expect(rowCol2FileRank([4, 7])).toEqual('h4');
        });
    });

    describe('fileRank2RowCol', () => {
        test('works', () => {
            expect(fileRank2RowCol('f7')).toEqual([1, 5]);
            expect(fileRank2RowCol('h4')).toEqual([4, 7]);
        });
    });
});