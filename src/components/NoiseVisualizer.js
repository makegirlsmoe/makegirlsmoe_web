import React, { Component } from 'react';
import Config from '../Config';

class NoiseVisualizer extends Component {

    componentDidMount() {
        this.draw(this.props.noise);
    }

    componentWillReceiveProps(nextProps) {
        this.draw(nextProps.noise);
    }

    draw(noise) {
        var canvas = this.canvas;
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
        var ctx = canvas.getContext("2d");
        var baseColor0 = hexToRgb('#ffffff');
        var baseColor1 = hexToRgb(Config.colors.theme);
        var range = 1;

        function drawLine(x1, y1, x2, y2, color) {
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }

        function getColorComponent(x, baseComponent0, baseComponent1) {
            var tmp = x / (range * 2) + 0.5;
            var value = Math.floor((1 - tmp) * baseComponent0 + tmp * baseComponent1);
            if (value < 0) {
                return 0;
            }
            else if (value > 255) {
                return 255;
            }
            else {
                return value;
            }
        }

        function getColor(x) {
            return 'rgb(' + getColorComponent(x, baseColor0.r, baseColor1.r) + ',' + getColorComponent(x, baseColor0.g, baseColor1.g) + ',' + getColorComponent(x, baseColor0.b, baseColor1.b) + ')';
        }

        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        if (noise) {
            for (var i = 0; i < canvasWidth; i++) {
                drawLine(i, 0, i, canvasHeight, getColor(noise[i]));
            }
        }
    }

    render() {
        return (
            <div className="noise-canvas">
                <canvas width={Config.gan.noiseLength} height={34} ref={canvas => this.canvas = canvas} />
            </div>
        );
    }
}

export default NoiseVisualizer;
