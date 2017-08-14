import Config from '../Config';

class ImageEncoder {
    static encode(result) {
        var canvas = document.createElement('canvas');
        var canvasWidth = Config.gan.imageWidth;
        var canvasHeight = Config.gan.imageHeight;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
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
                    convertValue(result[(i + j * canvasWidth) * 3 + 2]),
                    convertValue(result[(i + j * canvasWidth) * 3 + 1]),
                    convertValue(result[(i + j * canvasWidth) * 3]),
                    255);
            }
        }

        updateCanvas();

        return canvas.toDataURL();
    }

    static encodeNoiseOrigin(noiseOrigin) {
        var canvas = document.createElement('canvas');
        var canvasWidth = Config.gan.noiseLength;
        var canvasHeight = 34;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        var ctx = canvas.getContext("2d");
        var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

        function drawLine(x, color) {
            for (var i = x * 4; i < canvasData.data.length; i += canvasWidth * 4) {
                canvasData.data[i] = color.r;
                canvasData.data[i + 1] = color.g;
                canvasData.data[i + 2] = color.b;
                canvasData.data[i + 3] = color.a;
            }
        }

        function getColor(x) {
            return {
                r: 255,
                g: Math.floor((1 - x[1]) * 256),
                b: Math.floor((1 - x[0]) * 256),
                a: 255
            };
        }

        function updateCanvas() {
            ctx.putImageData(canvasData, 0, 0);
        }

        for (var i = 0; i < canvasWidth; i++) {
            drawLine(i, getColor(noiseOrigin[i]));
        }

        updateCanvas();

        return canvas.toDataURL();
    }
}

export default ImageEncoder;