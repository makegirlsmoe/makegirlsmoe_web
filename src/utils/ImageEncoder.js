import Config from '../Config'

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
}

export default ImageEncoder;