import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Utils from '../utils/Utils';
import './SliderWithInput.css';

class SliderWithInput extends Component {

    constructor() {
        super();
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({text: null});
    }

    render() {
        return (
            <div className="slider-container row">
                <div className="col-xs-7 slider-container-inner">
                    <Slider min={-1} max={1} step={0.1} value={Utils.clamp(this.props.value, -1, 1)} onChange={(value) => this.props.onChange(value)}/>
                </div>

                <div className="col-xs-5 slider-text">
                    <input type="text" value={this.state.text != null ? this.state.text : this.props.value} onChange={(event) => {
                        var input = event.target.value;
                        var value = +input;
                        if (!isNaN(value) && input.length > 0 && input.indexOf('.') !== input.length - 1) {
                            if (parseInt(value, 10) !== value) {
                                value = value.toFixed(1);
                            }
                            if (value > 100) {
                                value = 100;
                            }
                            else if (value < -100) {
                                value = -100;
                            }
                            this.props.onChange(value);
                        }
                        else {
                            this.setState({text: event.target.value});
                        }
                    }} />
                </div>
            </div>
        );
    }
}

export default SliderWithInput;