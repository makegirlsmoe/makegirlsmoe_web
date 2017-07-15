import React, { Component } from 'react';
import Utils from '../utils/Utils';
import './MultipleSelector.css';

const DEFAULT_VALUE = 0;

class MultipleSelector extends Component {

    constructor(props) {
        super();
        this.options = ['random'].concat(props.options);
    }

    renderOption(title, value) {
        return (
            <li key={title}><a onClick={() => this.props.onChange(value)}>{title}</a></li>
        )
    }

    render() {
        return (
            <div className="dropdown multiple-selector">
                <button className="btn btn-default" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <div className="dropdown-toggle">
                        <div>{Utils.keyToString(this.options[this.props.value || DEFAULT_VALUE])}</div>
                        <div className="caret" />
                    </div>

                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    {this.options.map((option, index) => {
                        if (typeof option === 'string') {
                            return this.renderOption(Utils.keyToString(option), index);
                        }
                        else {
                            if (!option.disabled) {
                                return this.renderOption(Utils.keyToString(option.key), index);
                            }
                            else {
                                return null;
                            }
                        }
                    })}
                </ul>
            </div>
        );
    }
}

export default MultipleSelector;
