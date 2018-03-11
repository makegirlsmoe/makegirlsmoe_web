import React, { Component } from 'react';
import Config from '../../Config';
import { FormattedMessage } from "react-intl";

class ButtonGroup extends Component {

    renderButton(props) {
        var style = {
            outline: 0,

            active: {
                backgroundColor: Config.colors.theme,
                color: '#fff',
                boxShadow: 'inset 0 3px 5px rgba(0, 0, 0, .125)',
            }
        };
        return (

            <button type="button" className="btn btn-default"
                    key={props.key || props.name}
                    style={Object.assign({}, style, props.isActive && style.active)}
                    disabled={props.isDisabled}
                    onClick={(event) => {
                        props.onClick();
                        event.stopPropagation();
                        event.nativeEvent.stopImmediatePropagation();
                    }}
            >

                {typeof props.name === 'string' ? <FormattedMessage id={props.name}/> : props.name}

            </button>
        );
    }

    renderButtonGroup(buttons) {
        return (
            <div className="btn-group" role="group">
                {buttons.map(options => this.renderButton(options))}
            </div>
        );
    }
}

export default ButtonGroup;
