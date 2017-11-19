import React, { Component } from 'react';
import Utils from '../../utils/Utils';
import './Dropdown.css';
import { FormattedMessage } from "react-intl";


class Dropdown extends Component {

    constructor(props) {
        super();
        this.options = props.options;
    }

    componentWillReceiveProps(newProps) {
        this.options = newProps.options;
    }

    renderOption(title, index) {
        return (
            <li key={title}><a onClick={() => this.onOptionClick(index)}><FormattedMessage id={title}/></a></li>
        )
    }

    onOptionClick(index) {
        if (this.options[index] !== this.getValue()) {
            this.props.onChange(this.options[index]);
        }
    }

    getValue() {
        return this.props.value;
    }

    render() {
        return (
            <div className="dropdown multiple-selector">
                <button className="btn btn-default" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <div className="dropdown-toggle">
                        <div><FormattedMessage id={this.getValue()}/></div>
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

export default Dropdown;
