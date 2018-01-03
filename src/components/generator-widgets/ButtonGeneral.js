import React, { Component } from 'react';
import { FormattedMessage } from "react-intl";
import Config from '../../Config'

class ButtonGeneral extends Component {

    render() {
        var style = {
            //backgroundColor: Config.colors.theme,
            borderColor: Config.colors.themeDarker
        };

        return (
            <button className={"btn " + (this.props.className || '')} style={style} disabled={this.props.disabled} onClick={this.props.onClick}>
                <FormattedMessage id={this.props.text}/>
            </button>
        );
    }
}

export default ButtonGeneral;