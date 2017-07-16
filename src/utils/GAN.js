import Config from '../Config';
import Utils from '../utils/Utils';

class GAN {

    constructor() {
        this.runner = null;
        this.currentNoise = null;
    }

    async init(onInitProgress) {
        this.runner = await window.WebDNN.load(Config.gan.model, {progressCallback: onInitProgress});

        try {
            this.runner.getInputViews()[0].toActual();
        }
        catch (err) {
            throw new Error('Network Error');
        }
    }

    async run(label, noise) {
        this.currentNoise = noise || Array.apply(null, {length: Config.gan.noiseLength}).map(Utils.randomNormal);
        let input = this.currentNoise.concat(label);
        this.runner.getInputViews()[0].set(input);
        await this.runner.run();
        let output = this.runner.getOutputViews()[0].toActual();
        return output;
    }

    getCurrentNoise() {
        return this.currentNoise;
    }
}

export default GAN;