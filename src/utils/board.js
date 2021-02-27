/**
 * Convert (row, col) pair to fileRank.
 * @param {Array<number>} rowCol
 */
export function rowCol2FileRank(rowCol) {
    const [row, col] = rowCol;
    if (!typeof row === 'number') {
        throw TypeError('Row must be a number');
    }
    if (!typeof col === 'number') {
        throw TypeError('Column must be a number');
    }
    if (row < 0 || row > 7) {
        throw RangeError('Row out of bounds');
    }
    if (col < 0 || col > 7) {
        throw RangeError('Column out of bounds');
    }

    const file = String.fromCharCode(col + 97);
    const rank = 8 - row;
    return `${file}${rank}`;
}

/**
 * Convert fileRank to (row, col).
 * @param {string} fileRank
 */
export function fileRank2RowCol(fileRank) {
    if (!typeof fileRank === 'string' || fileRank.length !== 2 || fileRank.toLowerCase() !== fileRank) {
        throw TypeError('FileRank must be 2-character lowercase string');
    }

    const file = fileRank[0];
    const rank = Number(fileRank[1]);
    if (file < 'a' || file > 'h') {
        throw RangeError('File out of bounds');
    }
    if (rank < 1 || rank > 8) {
        throw RangeError('Rank out of bounds');
    }

    const row = 8 - rank;
    const col = file.charCodeAt(0) - 97;
    return [row, col];
}
