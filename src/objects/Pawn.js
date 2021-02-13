import ChessPiece from './ChessPiece';
import Color from '../utils/color';

class Pawn extends ChessPiece {
    constructor(color, row, col) {
        const icon = color === Color.WHITE ? '♙' : '♟';
        super(icon, color, row, col);

        this.hasMoved = false;
    }

    move(row, col) {
        super.move(row, col);
        this.hasMoved = true;
    }
}

export default Pawn;