import React, { Component } from 'react';
import Config from '../Config';

const DEFAULT_VALUE = 0;

class BinarySelector extends Component {

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
                    style={Object.assign({}, style, this.isButtonActive(value) && style.active)}
                    onClick={() => this.props.onChange(value)}>
                {name}
            </button>
        );
    }

    render() {
        return (
            <div className="btn-group" role="group">
                {this.renderButton('Off', -1)}
                {this.renderButton('Random', 0)}
                {this.renderButton('On', 1)}
            </div>
        );
    }
}

export default BinarySelector;
