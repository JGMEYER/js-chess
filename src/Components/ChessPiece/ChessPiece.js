import React from 'react';
import PropTypes from 'prop-types';

import './ChessPiece.css';

class ChessPiece extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                className="chess-piece"
                style={{
                    top: `${this.props.row * 50}px`,
                    left: `${this.props.col * 50}px`,
                }}>
                {this.icon}
            </div>
        );
    }
}

ChessPiece.propTypes = {
    color: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
}

export default ChessPiece;