import React from "react";
import PropTypes from 'prop-types';

import './HistoryControlUI.css';

class HistoryControlUI extends React.Component {
    constructor(props) {
        super(props);

        this.handleToStartOnClick = this.handleToStartOnClick.bind(this);
        this.handleBackOnClick = this.handleBackOnClick.bind(this);
        this.handleForwardOnClick = this.handleForwardOnClick.bind(this);
        this.handleToEndOnClick = this.handleToEndOnClick.bind(this);
    }

    handleToStartOnClick(e) {
        this.props.toStart();
    }

    handleBackOnClick(e) {
        this.props.back();
    }

    handleForwardOnClick(e) {
        this.props.forward();
    }

    handleToEndOnClick(e) {
        this.props.toEnd();
    }

    render() {
        return (
            <div className="history-control-ui">
                <button
                    className="history-button"
                    onClick={this.handleToStartOnClick}>«</button>
                <button
                    className="history-button"
                    onClick={this.handleBackOnClick}>‹</button>
                <button
                    className="history-button"
                    onClick={this.handleForwardOnClick}>›</button>
                <button
                    className={`history-button${this.props.isInPast ? ' active' : ''}`}
                    onClick={this.handleToEndOnClick}>»</button>
            </div>
        );
    }
}

HistoryControlUI.propTypes = {
    isInPast: PropTypes.bool.isRequired,
    toStart: PropTypes.func.isRequired,
    back: PropTypes.func.isRequired,
    forward: PropTypes.func.isRequired,
    toEnd: PropTypes.func.isRequired,
}

export default HistoryControlUI;