import React, { Component } from 'react';
import { FormattedMessage } from "react-intl";
import Config from '../../Config'

class ButtonPrimary extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var style = {
            backgroundColor: Config.colors.theme,
            borderColor: Config.colors.themeDarker
        };

        return (
            <button className={"btn btn-primary " + (this.props.className || '')} style={style} disabled={this.props.disabled} onClick={this.props.onClick}>
                {this.props.notFormatMessage ? this.props.text :  <FormattedMessage id={this.props.text}/> }
            </button>
        );
    }
}

export default ButtonPrimary;