class ChessBoardHistory {
    constructor() {
        this.history = [];
        this.idx = -1;
        this.isInPast = false;
    }

    /**
     * Get FEN str at current position in history.
     * @returns
     */
    get() {
        return this.history[this.idx];
    }

    /**
     * Add FEN code to the history.
     * @param {string} fenCode
     */
    push(fenCode) {
        if (!typeof fenCode === 'string') {
            throw new Error('Expecting FEN string');
        }
        if (this.isInPast) {
            throw new Error('Cannot add to history while in the past.');
        } else {
            this.history.push(fenCode);
            this.idx++;
        }
    }

    /**
     * Move history back a step.
     */
    back() {
        if (this.idx > 0) {
            this.idx--;
            this.isInPast = true;
        }
        return this.history[this.idx];
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
        return this.history[this.idx];
    }

    /**
     * Move history to start.
     */
    toStart() {
        this.idx = 0;
        this.isInPast = true;
        return this.history[this.idx];
    }

    /**
     * Move history to end.
     */
    toEnd() {
        this.idx = this.history.length - 1;
        this.isInPast = false;
        return this.history[this.idx];
    }
}

export default ChessBoardHistory;