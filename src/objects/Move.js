import { fileRank2RowCol } from "../utils/board";

class Move {
    /**
     * Construct Move
     * @param {string} to fileRank
     * @param {string} from fileRank
     * @param {string} promotion promotion i.e. /[qrbn]/
     */
    constructor(from, to, promotion) {
        this.from = from;
        this.to = to;
        this.promotion = promotion;
    }

    fromToRowCol() {
        return fileRank2RowCol(this.from);
    }

    toToRowCol() {
        return fileRank2RowCol(this.to);
    }
}

export default Move;