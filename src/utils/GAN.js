import Config from '../Config';
import Utils from '../utils/Utils';

class GAN {

    constructor() {
        this.runner = null;
        this.currentNoise = null;
        this.input = null;
    }

    static getWeightFilePrefix() {
        var index = Math.floor(Math.random() * Config.gan.modelServers.length);
        return 'http://' + Config.gan.modelServers[index] + Config.gan.model;
    }

    async init(onInitProgress) {
        this.runner = await window.WebDNN.load(Config.gan.model, {progressCallback: onInitProgress, weightDirectory: GAN.getWeightFilePrefix()});

        try {
            this.runner.getInputViews()[0].toActual();
        }
        catch (err) {
            throw new Error('Network Error');
        }
    }

    async run(label, noise, noiseOrigin) {
        this.currentNoiseOrigin = noise ? noiseOrigin : [];
        this.currentNoise = noise || Array.apply(null, {length: Config.gan.noiseLength}).map(() => Utils.randomNormal((u, v) => this.currentNoiseOrigin.push([u, v])));
        let input = this.currentNoise.concat(label);
        this.currentInput = input;
        this.runner.getInputViews()[0].set(input);
        await this.runner.run();
        let output = this.runner.getOutputViews()[0].toActual();
        return output;
    }

    getCurrentNoise() {
        return this.currentNoise;
    }

    getCurrentNoiseOrigin() {
        return this.currentNoiseOrigin;
    }

    getCurrentInput() {
        return this.currentInput;
    }
}

export default GAN;