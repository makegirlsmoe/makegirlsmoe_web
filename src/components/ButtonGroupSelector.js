import React, { Component } from 'react';
import Config from '../Config';

const DEFAULT_VALUE = 0;

class ButtonGroupSelector extends Component {

    isButtonActive(value) {
        return (this.props.value || DEFAULT_VALUE) === value;
    }

    renderButton(name, value) {
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
                    key={name}
                    style={Object.assign({}, style, this.isButtonActive(value) && style.active)}
                    onClick={() => this.props.onChange(value)}>
                {name}
            </button>
        );
    }

    renderButtonGroup(options) {
        return (
            <div className="btn-group" role="group">
                {options.map(option => this.renderButton(option.name, option.value))}
            </div>
        );
    }
}

export default ButtonGroupSelector;
