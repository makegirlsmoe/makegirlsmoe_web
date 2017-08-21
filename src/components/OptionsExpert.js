import React, { Component } from 'react';
import Options from './Options';
import Config from '../Config';
import Utils from '../utils/Utils';
import RandomButtons from './RandomButtons';
import BinarySelector from './BinarySelector';
import MultipleSelector from './MultipleSelector';
import NoiseSelector from './NoiseSelector';
import NoiseVisualizer from './NoiseVisualizer';
import ButtonGroup from './ButtonGroup';
import ImageDecoder from '../utils/ImageDecoder';
import PromptDialog from './PromptDialog';
import SliderWithInput from './SliderWithInput';

import 'rc-slider/assets/index.css';
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
                            <div className="col-xs-6 col-sm-4">
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
}

export default OptionsExpert;