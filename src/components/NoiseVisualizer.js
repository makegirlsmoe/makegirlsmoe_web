import React, { Component } from 'react';
import ImageEncoder from '../utils/ImageEncoder';

class NoiseVisualizer extends Component {

    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.draw(this.props.noise);
    }

    componentWillReceiveProps(nextProps) {
        this.draw(nextProps.noise);
    }

    draw(noise) {
        var dataURL = noise ? ImageEncoder.encodeNoiseOrigin(noise) : null;
        this.setState({dataURL: dataURL});
    }

    render() {
        return (
            <div className="noise-canvas">
                {this.state.dataURL && <img src={this.state.dataURL} alt="noise" />}
            </div>
        );
    }
}

export default NoiseVisualizer;
