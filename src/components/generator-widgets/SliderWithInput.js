import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Utils from '../../utils/Utils';
import './SliderWithInput.css';

class SliderWithInput extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.updateProps(props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({text: null});
        this.updateProps(nextProps);
    }

    updateProps(props) {
        this.min = props.min != null ? props.min : -1;
        this.max = props.max != null ? props.max : 1;
        this.step = props.step || 0.1;
        this.inputMin = props.inputMin != null ? props.inputMin : props.min != null ? props.min : -100;
        this.inputMax = props.inputMax != null ? props.inputMax : props.max != null ? props.max : 100;
    }

    render() {
        return (
            <div className="slider-container flex">
                <div className="flex-grow slider-container-inner">
                    <Slider min={this.min} max={this.max} step={this.step} value={Utils.clamp(this.props.value, this.min, this.max)} onChange={(value) => this.props.onChange(value)}/>
                </div>

                <div className="slider-text">
                    <input type="text" value={this.state.text != null ? this.state.text : this.props.value} onChange={(event) => {
                        var input = event.target.value;
                        var value = +input;
                        if (!isNaN(value) && input.length > 0 && input.indexOf('.') !== input.length - 1 && value >= this.inputMin && value <= this.inputMax) {
                            this.props.onChange(value);
                        }
                        else {
                            this.setState({text: event.target.value});
                        }
                    }} onBlur={(event) => {
                        var input = event.target.value;
                        var value = +input;
                        if (!isNaN(value)) {
                            if (value > this.inputMax) {
                                this.props.onChange(this.inputMax);
                            }
                            else if (value < this.inputMin) {
                                this.props.onChange(this.inputMin);
                            }
                            else {
                                this.props.onChange(value);
                            }
                        }
                        else {
                            this.setState({text: this.props.value});
                        }
                    }}/>
                </div>
            </div>
        );
    }
}

export default SliderWithInput;