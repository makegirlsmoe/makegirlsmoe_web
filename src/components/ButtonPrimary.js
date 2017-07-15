import React, { Component } from 'react';
import Config from '../Config'

class ButtonPrimary extends Component {

    render() {
        var style = {
            backgroundColor: Config.colors.theme,
            borderColor: Config.colors.themeDarker
        };

        return (
            <button className="btn btn-primary" style={style} disabled={this.props.disabled} onClick={this.props.onClick}>{this.props.text}</button>
        );
    }
}

export default ButtonPrimary;