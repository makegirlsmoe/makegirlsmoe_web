import React, { Component } from 'react';
import Config from '../Config';

class ResultCanvas extends Component {

    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        var canvas = this.canvas;
        var canvasWidth = Config.gan.imageWidth;
        var canvasHeight = Config.gan.imageHeight;
        var ctx = canvas.getContext("2d");
        var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

        function drawPixel (x, y, r, g, b, a) {
            var index = (x + y * canvasWidth) * 4;

            canvasData.data[index] = r;
            canvasData.data[index + 1] = g;
            canvasData.data[index + 2] = b;
            canvasData.data[index + 3] = a;
        }

        function convertValue(x) {
            return (x + 1) * 127.5;
        }

        function updateCanvas() {
            ctx.putImageData(canvasData, 0, 0);
        }

        for (var i = 0; i < canvasWidth; i++) {
            for (var j = 0; j < canvasHeight; j++) {
                drawPixel(
                    i,
                    j,
                    convertValue(this.props.result[(i + j * canvasWidth) * 3 + 2]),
                    convertValue(this.props.result[(i + j * canvasWidth) * 3 + 1]),
                    convertValue(this.props.result[(i + j * canvasWidth) * 3]),
                    255);
            }
        }

        updateCanvas();

        this.setState({dataURL: canvas.toDataURL()});
    }

    render() {
        return (
            <div className="result-canvas">
                <canvas width={Config.gan.imageWidth} height={Config.gan.imageHeight} ref={canvas => this.canvas = canvas} hidden={true} />
                {this.state.dataURL && <img src={this.state.dataURL} alt="result" />}
            </div>
        );
    }
}

export default ResultCanvas;
