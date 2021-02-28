import React from 'react';
import PropTypes from 'prop-types';

import './FENFormUI.css';
import ChessBoardState from '../../objects/ChessBoardState';

class FENFormUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = { fenCode: this.props.fenCode };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Save props into state on update.
     * @param {object} prevProps
     */
    componentDidUpdate(prevProps) {
        if (prevProps.fenCode !== this.props.fenCode) {
            this.setState(prev => ({
                ...prev,
                fenCode: this.props.fenCode,
            }));
        }
    }

    /**
     * Handle change
     * @param {object} event
     */
    handleChange(e) {
        this.setState(prev => ({
            ...prev,
            fenCode: e.target.value,
            errorStr: '',
        }));
    }

    /**
     * Handle submit
     * @param {object} event
     */
    handleSubmit(e) {
        e.preventDefault();
        try {
            ChessBoardState.fromFEN(this.state.fenCode);
        } catch (error) {
            this.setState(prev => ({
                ...prev,
                errorStr: error.message,
            }));
            return;
        }
        this.props.updateBoard(this.state.fenCode);
    }

    /**
     * Render
     */
    render() {
        return (
            <div>
                <form className="fen-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="fen-input">FEN</label>
                    <input
                        className="fen-input"
                        name="fen-input"
                        type="text"
                        size="87"
                        maxLength="87"
                        value={this.state.fenCode}
                        onChange={this.handleChange}
                    >
                    </input>
                </form>
                <p className="fen-form-error">{this.state.errorStr}</p>
            </div>
        )
    }
}

FENFormUI.propTypes = {
    fenCode: PropTypes.string.isRequired,
    updateBoard: PropTypes.func.isRequired,
}

export default FENFormUI;