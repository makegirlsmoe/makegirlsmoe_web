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
            <li key={title}><a onClick={() => this.props.onChange(value)}>{Utils.keyToString(title)}</a></li>
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
                    {this.options.map((option, index) => this.renderOption(option, index))}
                </ul>
            </div>
        );
    }
}

export default MultipleSelector;
