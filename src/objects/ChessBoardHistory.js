class ChessBoardHistory {
    constructor() {
        this.history = [];
        this.idx = -1;
        this.isInPast = false;
    }

    /**
     * Add FEN str to the history.
     * @param {string} fenStr
     */
    push(fenStr) {
        if (!typeof fenStr === 'string') {
            throw new Error('Expecting FEN string');
        }
        if (this.isInPast) {
            throw new Error('Cannot add to history while in the past.');
        } else {
            this.history.push(fenStr);
            this.idx++;
        }
    }

    /**
     * Move history back a step.
     */
    back() {
        if (this.idx > 0) {
            this.idx--;
        }
        this.isInPast = true;
    }

    /**
     * Move history forward a step.
     */
    forward() {
        if (this.idx < this.history.length - 1) {
            this.idx++;
        }
        if (this.idx === this.history.length - 1) {
            this.isInPast = false;
        }
    }

    /**
     * Move history to start.
     */
    toStart() {
        this.idx = 0;
        this.isInPast = true;
    }

    /**
     * Move history to end.
     */
    toEnd() {
        this.idx = this.history.length - 1;
        this.isInPast = false;
    }
}

export default ChessBoardHistory;