import React, { Component } from 'react';
import Config from '../Config';
import ButtonPrimary from './ButtonPrimary';
import ResultCanvas from './ResultCanvas';
import './Generator.css'

class Generator extends Component {

    renderResultCanvas(result, index) {
        return (
            <div key={index} className="result-container" style={{zIndex: 1000 + index}}>
                <ResultCanvas result={result} />
            </div>
        );
    }

    render() {
        var resultWrapperStyle = {
            height: Config.gan.imageHeight,
            width: Config.gan.imageWidth
        };

        return (
            <div className="generator">
                <div className="result-wrapper" style={resultWrapperStyle}>
                    {this.props.results ? this.props.results.map((result, index) => this.renderResultCanvas(result, index)) : null}
                </div>
                <ButtonPrimary
                    text={this.props.gan.isRunning ? 'Generating...' : 'Generate'}
                    disabled={this.props.gan.isRunning || !this.props.gan.isReady}
                    onClick={this.props.onGenerateClick} />
            </div>
        );
    }
}

export default Generator;
