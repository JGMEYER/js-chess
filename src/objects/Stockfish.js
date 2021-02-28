import ChessBoardState from './ChessBoardState';
import Move from './Move';

class Stockfish {
    constructor() {
        this.stockfish = new Worker('stockfish.js');

        this.bestMove = null;
        this.isThinking = false;
        this.engineStatus = {};

        this.stockfish.onmessage = (event) => {
            const line = event && typeof event === 'object' ? event.data : event;

            if (line === 'uciok') {
                this.engineStatus.engineLoaded = true;
            } else if (line === 'readyok') {
                this.engineStatus.engineReady = true;
            } else {
                const match = line.match('^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?');
                if (match) {
                    this.isThinking = false;
                    this.bestMove = new Move(match[1], match[2], match[3]);
                }
            }
        }

        this.stockfish.postMessage('uci');
        this.stockfish.postMessage('ucinewgame');
    }

    /**
     * Update engine state to fenCode.
     * @param {string} fenCode
     */
    setFEN(fenCode) {
        this.stockfish.postMessage(`position fen ${fenCode}`);
    }

    /**
     * Start churning for best move.
     * @param {ChessBoardState} chessBoardState
     * @param {number} depth
     */
    searchBestMove(chessBoardState, depth = 10) {
        this.bestMove = null;
        this.isThinking = true;

        this.setFEN(chessBoardState.toFEN());
        this.stockfish.postMessage(`go depth ${depth}`);
    }

    /**
     * Returns best move if one has been found.
     */
    getBestMove() {
        return this.isThinking ? null : this.bestMove;
    }
}

export default Stockfish