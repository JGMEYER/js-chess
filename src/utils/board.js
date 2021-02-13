/**
 * Convert (row, col) pair to (file, rank).
 * @param {number} row
 * @param {number} col
 */
export function rowCol2FileRank(row, col) {
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
    return [file, rank]
}

/**
 * Convert (file, rank) pair to (row, col).
 * @param {string} file
 * @param {number} rank
 */
export function fileRank2RowCol(file, rank) {
    if (!typeof file === 'string' || file.length !== 1 || file.toLowerCase() !== file) {
        throw TypeError('File must be a single lowercase letter');
    }
    if (!typeof rank === 'number') {
        throw TypeError('Rank must be a number');
    }
    if (file < 'a' || file > 'h') {
        throw RangeError('File out of bounds');
    }
    if (rank < 0 || rank > 7) {
        throw RangeError('Rank out of bounds');
    }

    const row = 8 - rank;
    const col = file.charCodeAt(0) - 97;
    return [row, col];
}
