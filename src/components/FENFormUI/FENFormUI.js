import React from 'react';
import PropTypes from 'prop-types';

class FENFormUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = { fenCode: this.props.fenCode };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ fenCode: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.updateBoard(this.state.fenCode);
    }

    render() {
        return (
            <form className="fen-form" onSubmit={this.handleSubmit}>
                <label htmlFor="fen-input">FEN</label>
                <input
                    className="fen-input"
                    name="fen-input"
                    type="text"
                    size="87"
                    value={this.state.fenCode}
                    onChange={this.handleChange}
                >
                </input>
            </form>
        )
    }
}

FENFormUI.propTypes = {
    fenCode: PropTypes.string.isRequired,
    updateBoard: PropTypes.func.isRequired,
}

export default FENFormUI;