class ImageDecoder {

    constructor(modelConfig) {
        this.modelConfig = modelConfig;
    }

    DecodeNoiseOrigin(dataURL) {
        return new Promise((resolve, reject) => {
            var canvas = document.createElement('canvas');
            var canvasWidth = this.modelConfig.gan.noiseLength;
            var canvasHeight = 34;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            var ctx = canvas.getContext("2d");

            var image = new Image();
            image.onload = () => {
                if (image.width !== canvasWidth || image.height !== canvasHeight) {
                    return reject({error: 'Invalid Noise Image.'});
                }
                ctx.drawImage(image, 0, 0);
                var imgd = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
                var pix = imgd.data;
                var result = [];
                for (var i = 0; i < canvasWidth * 4; i += 4) {
                    result.push([1 - pix[i + 2] / 256, 1 - pix[i + 1] / 256]);
                }
                resolve(result);
            };
            image.onerror = function() {
                reject({error: 'Failed to load image.'});
            };

            image.src = dataURL;
        });
    }
}

export default ImageDecoder;