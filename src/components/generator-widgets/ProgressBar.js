import React, { Component } from 'react';

class ProgressBar extends Component {
    render() {
        return (
            <div className="progress" style={{marginBottom: 10}}>
                <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow={this.props.value} aria-valuemin="0" aria-valuemax="100" style={{width: this.props.value + '%'}}>
                    <span className="sr-only">{this.props.value}% Complete</span>
                </div>
            </div>
        );
    }
}

export default ProgressBar;