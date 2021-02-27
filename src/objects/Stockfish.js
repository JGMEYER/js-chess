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
                    this.bestMove = { from: match[1], to: match[2], promotion: match[3] };
                }
            }
        }

        this.stockfish.postMessage('uci');
        this.stockfish.postMessage('ucinewgame');
    }

    setFEN(fenCode) {
        this.stockfish.postMessage(`position fen ${fenCode}`);
    }

    searchBestMove(chessBoardState, depth = 10) {
        this.bestMove = null;
        this.isThinking = true;

        this.setFEN(chessBoardState.toFEN());
        this.stockfish.postMessage(`go depth ${depth}`);
    }

    getBestMove() {
        return this.isThinking ? null : this.bestMove;
    }
}

export default Stockfish