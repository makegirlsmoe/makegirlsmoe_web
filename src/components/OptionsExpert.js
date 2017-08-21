import React, { Component } from 'react';
import Options from './Options';
import RandomButtons from './RandomButtons';
import SliderWithInput from './SliderWithInput';
import ButtonGroup from './ButtonGroup';
import './Options.css';

class OptionsExpert extends Options {

    constructor(props) {
        super(props);
        this.state.expended = {};
    }

    renderBinarySelector(key, title) {
        var input = this.props.inputs[key];
        return (
            <div className="col-xs-6 col-sm-4 option">
                {this.renderLabel(key, title)}
                <RandomButtons
                    value={input.random ? 1 : 0}
                    onChange={(value) => this.props.onChange(key, value === 1)}/>
                <SliderWithInput value={input.value} onChange={value => this.props.onChange(key, false, value)}/>
            </div>
        );
    }

    renderMultipleSelector(key, options, title) {
        var input = this.props.inputs[key];
        return (
            <div className="col-xs-12 option">
                <div className="row option-expert-multiple"
                     onClick={() => this.setState({expended: Object.assign({}, this.state.expended, {[key]: !this.state.expended[key]})})}>

                    <div className="col-sm-3 col-xs-4">
                        {this.renderLabel(key, title, true)}
                    </div>
                    <div className="col-xs-6">
                        <RandomButtons
                            value={input.random ? 1 : 0}
                            onChange={(value) => this.props.onChange(key, value === 1)}/>
                    </div>
                    <div className="col-xs-1 pull-right">
                        {this.state.expended[key] ?
                            <span className="icon-expand glyphicon glyphicon-chevron-down"/> :
                            <span className="icon-expand glyphicon glyphicon-chevron-right"/>
                        }
                    </div>
                </div>
                {this.state.expended[key] &&
                    <div className="row">
                        {options.map((option, index) =>
                            <div key={option} className="col-xs-6 col-sm-4">
                                {this.renderLabel(option)}
                                <SliderWithInput value={input.value[index]} onChange={value => {
                                    var newInput = input.value.slice();
                                    newInput[index] = value;
                                    this.props.onChange(key, false, newInput)
                                }}/>
                            </div>
                        )}
                    </div>
                }
                <hr/>
            </div>
        );
    }

    renderOperations() {
        return (
            <div className="col-xs-12 option">
                <h5>Operations</h5>
                {new ButtonGroup().renderButtonGroup([
                    {name: 'Reset', onClick: () => this.props.onOperationClick('reset')},
                    {name: 'JSON Import', onClick: () => this.props.onOperationClick('json_import')},
                    {name: 'JSON Export', onClick: () => this.props.onOperationClick('json_export')}
                ])}
            </div>
        );
    }
}

export default OptionsExpert;