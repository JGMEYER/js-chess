import PropTypes from 'prop-types';

import ChessPiece from '../ChessPiece/ChessPiece';

class Pawn extends ChessPiece {
    constructor(props) {
        super(props);
        this.icon = props.color === 'white' ? '♙' : '♟';
    }
}

ChessPiece.propTypes = {
    color: PropTypes.string.isRequired,
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
}

export default Pawn;