class ImageEncoder {

    constructor(modelConfig) {
        this.modelConfig = modelConfig;
    }

    encode(result, dstWidth = this.modelConfig.gan.imageWidth, dstHeight = this.modelConfig.gan.imageHeight) {
        var canvas = document.createElement('canvas');
        var srcWidth = this.modelConfig.gan.imageWidth;
        var srcHeight = this.modelConfig.gan.imageHeight;
        canvas.width = dstWidth;
        canvas.height = dstHeight;

        window.WebDNN.Image.setImageArrayToCanvas(result, srcWidth, srcHeight, canvas, {
            scale: [127.5, 127.5, 127.5],
            bias: [127.5, 127.5, 127.5],
            color: window.WebDNN.Image.Color.BGR,
            order: window.WebDNN.Image.Order.CHW,
            dstW: dstWidth,
            dstH: dstHeight
        });

        return canvas.toDataURL();
    }

    encodeNoiseOrigin(noiseOrigin) {
        var canvas = document.createElement('canvas');
        var canvasWidth = this.modelConfig.gan.noiseLength;
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
                a: 254
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