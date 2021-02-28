import React from 'react';
import PropTypes from 'prop-types';

import './ValidMovesUI.css';
import Move from '../../objects/Move';

class ValidMovesUI extends React.Component {
    constructor(props) {
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(row, col) {
        this.props.movePiece(row, col);
    }

    /**
     * Render ValidMovesUI.
     */
    render() {
        return (
            <div>
                {
                    this.props.validMoves.map((move, idx) => {
                        const [row, col] = move.toToRowCol();
                        return (
                            <div
                                key={`valid-move${idx}`}
                                className="valid-move"
                                style={{
                                    top: `${row * 50}px`,
                                    left: `${col * 50}px`,
                                }}
                                onClick={() => this.handleOnClick(row, col)}>
                                •
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

ValidMovesUI.propTypes = {
    validMoves: PropTypes.arrayOf(
        PropTypes.shape({
            from: PropTypes.string,
            to: PropTypes.string,
            promotion: PropTypes.string,
        })
    ).isRequired,
    movePiece: PropTypes.func.isRequired,
}

export default ValidMovesUI;