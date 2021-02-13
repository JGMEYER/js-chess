class ChessPiece {
    /**
     * @constructor
     * @param {string} icon
     * @param {Color} color
     * @param {number} row
     * @param {number} col
     */
    constructor(icon, color, row, col) {
        if (this.constructor == ChessPiece) {
            throw new Error('Cannot instantiate abstract class ChessPiece');
        }

        this.icon = icon;
        this.color = color;
        this.row = row;
        this.col = col;
    }

    /**
     * Move the ChessPiece to the designated (row, col).
     * @param {number} row
     * @param {number} col
     */
    move(row, col) {
        this.row = row;
        this.col = col;
    }

    /**
     * Returns a set of valid moves for the ChessPiece.
     * @returns {Array<Array<number>} array of valid move coordinates.
     */
    validMoves() {
        throw new Error('Method validMoves() must be implemented.');
    }
}

export default ChessPiece;
