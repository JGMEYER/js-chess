
class Move {
    /**
     * Construct Move
     * @param {Array<number>} coordsAStart piece A start
     * @param {Array<number>} coordsAEnd piece A end
     * @param {Array<number>} coordsBStart piece B start (for castling)
     * @param {Array<number>} coordsBEnd piece B end (for castling)
     */
    constructor(coordsAStart, coordsAEnd, coordsBStart = null, coordsBEnd = null) {
        this.coordsAStart = coordsAStart;
        this.coordsAEnd = coordsAEnd;
        this.coordsBStart = coordsBStart;
        this.coordsBEnd = coordsBEnd;
    }

    /**
     * Execute move on ChessBoardState. Can be overridden.
     * @param {ChessBoardState} chessBoardState
     */
    execute(chessBoardState) {
        chessBoardState.move(this);
    }
}

export default Move;