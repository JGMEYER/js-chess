import React from 'react';
import PropTypes from 'prop-types';

import './ValidMovesUI.css';

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
                    this.props.validMoves.map((move, idx) =>
                        <div
                            key={`valid-move${idx}`}
                            className="valid-move"
                            style={{
                                top: `${move[0] * 50}px`,
                                left: `${move[1] * 50}px`,
                            }}
                            onClick={() => this.handleOnClick(move[0], move[1])}>
                            •
                    </div>
                    )
                }
            </div>
        );
    }
}

ValidMovesUI.propTypes = {
    validMoves: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    movePiece: PropTypes.func.isRequired,
}

export default ValidMovesUI;