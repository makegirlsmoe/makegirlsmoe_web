import Config from '../Config';
import Utils from '../utils/Utils';

class GAN {

    constructor(modelConfig, options) {
        this.runner = null;
        this.currentNoise = null;
        this.input = null;
        this.modelConfig = modelConfig;
        this.options = options || {};
    }

    async getWeightFilePrefix() {
        var country = await Utils.getCountry();

        var servers = this.modelConfig.gan.modelServers.filter(server => server.country === country);
        if (servers.length === 0) {
            servers = this.modelConfig.gan.modelServers.filter(server => !server.country);
        }

        var index = Math.floor(Math.random() * servers.length);
        var modelPath = Config.modelCompression ? this.modelConfig.gan.model + '_8bit' : this.modelConfig.gan.model;
        return 'http://' + (servers[index].host || servers[index]) + modelPath;
    }

    getBackendOrder() {
        var order = ['webgpu', 'webassembly'];

        if (!this.options.disableWebgl) {
            order.splice(1, 0, 'webgl')
        }

        return order;
    }

    static getWebglTextureSize() {
        try {
            var gl = document.createElement('canvas').getContext('webgl');
            return gl.getParameter(gl.MAX_TEXTURE_SIZE);
        }
        catch (err) {
            return null;
        }
    }

    async init(onInitProgress) {
        var modelPath = Config.modelCompression ? this.modelConfig.gan.model + '_8bit' : this.modelConfig.gan.model;
        this.runner = await window.WebDNN.load(modelPath, {progressCallback: onInitProgress, weightDirectory: await this.getWeightFilePrefix(), backendOrder: this.getBackendOrder()});
    }

    async run(label, noise) {
        this.currentNoise = noise || Array.apply(null, {length: this.modelConfig.gan.noiseLength}).map(() => Utils.randomNormal());
        let input = this.currentNoise.concat(label);
        this.currentInput = input;
        this.runner.getInputViews()[0].set(input);
        await this.runner.run();
        let output = this.runner.getOutputViews()[0].toActual().slice();
        return output;
    }

    getBackendName() {
        return this.runner.backendName;
    }

    getCurrentNoise() {
        return this.currentNoise;
    }

    getCurrentInput() {
        return this.currentInput;
    }
}

export default GAN;