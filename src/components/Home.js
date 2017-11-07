import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { FormattedMessage } from "react-intl";
import { CSSTransitionGroup } from 'react-transition-group';
import Config from '../Config';
import About from './About';
import News from './News';
import Tips from './Tips';
import ProgressBar from './ProgressBar';
import Generator from './Generator';
import Options from './Options';
import OptionsExpert from './OptionsExpert';
import PromptDialog from './PromptDialog';
import GAN from '../utils/GAN';
import Utils from '../utils/Utils';
import Stat from '../utils/Stat';
import ImageEncoder from '../utils/ImageEncoder';
import Twitter from '../utils/Twitter';
import './Home.css';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            gan: {
                loadingProgress: 0,
                isReady: false,
                isRunning: false,
                isCanceled: false,
                isError: false
            },
            options: {},
            results: [],
            twitter: {
                visible: false
            },
            rating: 0,
            mode: 'normal',
            webglAvailable: false
        };
        this.initOptions(this.state.options, Config.defaultModel);
        this.ganDict = {};
    }

    getModelConfig() {
        return Config.modelConfig[this.state.options.currentModel];
    }

    initOptions(options, modelName) {
        options.amount = 1;
        options.currentModel = modelName;
        Config.modelConfig[modelName].options.forEach(option => {
            options[option.key] = {
                random: true,
                value: option.type === 'multiple' ? Array.apply(null, {length: option.options.length}).fill(-1) : -1
            }
        });
        options.noise = {
            random: true
        };
        return options;
    }

    setModel(modelName, disableWebgl = this.state.options && this.state.options.disableWebgl) {
        return new Promise((resolve, reject) => {
            var keyName = modelName + (disableWebgl ? '_nowebgl' : '');
            var options = this.state.options;

            if (!this.state.options || this.state.options.currentModel !== modelName) {
                options = this.initOptions({}, modelName);
            }

            this.setState({options: Object.assign(options, {disableWebgl: disableWebgl})});

            if (!this.ganDict[keyName]) {
                var gan = new GAN(Config.modelConfig[modelName], {disableWebgl: disableWebgl});
                var state = {
                    loadingProgress: 0,
                    isReady: false,
                    isRunning: false,
                    isCanceled: false,
                    isError: false
                };
                this.ganDict[keyName] = {
                    gan: gan,
                    state: state
                };
                this.setState({gan: state}, async () => {
                    if (Utils.usingCellularData()) {
                        try {
                            await this.dialog.show();
                        }
                        catch (err) {
                            this.setState({gan: Object.assign(state, {isCanceled: true})});
                            reject();
                        }
                    }
                    try {
                        await this.gan.init((current, total) => this.setState({gan: Object.assign(state, {loadingProgress: current / total * 100})}));
                        this.setState({gan: Object.assign(state, {isReady: true, backendName: this.gan.getBackendName()})});
                        resolve();
                    }
                    catch (err) {
                        this.setState({gan: Object.assign(state, {isError: true})});
                        reject(err);
                    }
                });
            }
            else {
                resolve();
            }
            this.gan = this.ganDict[keyName].gan;
            this.setState({gan: this.ganDict[keyName].state});
        });
    }

    async componentDidMount() {
        Stat.init({cellularData: Utils.usingCellularData()});
        this.showTwitterTimeline();

        try {
            if (window.WebDNN.getBackendAvailability().status.webgl
                    && !window.WebDNN.getBackendAvailability().status.webgpu) {
                this.setState({webglAvailable: true});
            }

            var textureSize = GAN.getWebglTextureSize();
            var disableWebgl = false;
            if (textureSize === null || textureSize < 16000) {
                disableWebgl = true;
                this.setState({options: Object.assign({}, this.state.options, {disableWebgl: true})});
            }

            var startTime = new Date();
            await this.setModel(Config.defaultModel, disableWebgl);
            var endTime = new Date();
            var loadTime = (endTime.getTime() - startTime.getTime()) / 1000;
            Stat.modelLoaded(loadTime);
        }
        catch (err) {
            console.log(err);
        }
    }

    showTwitterTimeline() {
        window.twttr.ready(() => {
            window.twttr.widgets.createTimeline(
                "897941606237704192",
                document.getElementById("twitter-timeline-container"),
                {
                    height: 600,
                    chrome: "noheader"
                }
            ).then(() =>{
                this.setState({twitter: Object.assign({}, this.state.twitter, {visible: true})});
                if (this.props.onTimelineLoad) {
                    this.props.onTimelineLoad();
                }
            });
        });
    }

    getRandomOptionValues(originalOptionInputs) {
        var optionInputs = window.$.extend(true, {}, originalOptionInputs);
        this.getModelConfig().options.forEach(option => {
            var optionInput = optionInputs[option.key];

            if (!optionInput || optionInput.random) {
                optionInput = optionInputs[option.key] = {random: true};

                if (option.type === 'multiple') {
                    var value = Array.apply(null, {length: option.options.length}).fill(-1);
                    if (option.isIndependent) {
                        for (var j = 0; j < option.options.length; j++) {
                            value[j] = Math.random() < option.prob[j] ? 1 : -1;
                        }
                    }
                    else {
                        var random = Math.random();
                        for (j = 0; j < option.options.length; j++) {
                            if (random < option.prob[j]) {
                                value[j] = 1;
                                break;
                            }
                            else {
                                random -= option.prob[j];
                            }
                        }
                    }
                    optionInput.value = value;
                }
                else {
                    optionInput.value = Math.random() < option.prob ? 1 : -1;
                }
            }
        });

        if (!optionInputs.noise || optionInputs.noise.random) {
            var value = [];
            optionInputs.noise = {random: true, value: value};
            Array.apply(null, {length: this.getModelConfig().gan.noiseLength}).map(() => Utils.randomNormal((u, v) => value.push([u, v])));
        }

        return optionInputs;
    }

    getLabel(optionInputs) {
        var label = Array.apply(null, {length: this.getModelConfig().gan.labelLength});
        this.getModelConfig().options.forEach(option => {
            var optionInput = optionInputs[option.key];

            if (option.type === 'multiple') {
                optionInput.value.forEach((value, index) => {
                    label[option.offset + index] = value;
                });

            }
            else {
                label[option.offset] = optionInput.value;
            }
        });
        return label;
    }

    getNoise(optionInputs) {
        var noise = optionInputs.noise.value.map(([u, v]) => Utils.uniformToNormal(u, v));
        return noise;
    }

    async generate() {
        this.setState({
            gan: Object.assign({}, this.state.gan, {isRunning: true})
        });

        if (this.gan.getBackendName() === 'webgl') {
            await Utils.promiseTimeout(100, true); // XXX: wait for components to refresh
        }

        for (var i = 0; i < this.state.options.amount; i++) {
            var optionInputs = this.getRandomOptionValues(this.state.options);
            var label = this.getLabel(optionInputs);
            var noise = this.getNoise(optionInputs);
            var result = await this.gan.run(label, noise);
            var results = i === 0 ? [result] : this.state.results.concat([result]);
            this.setState({
                options: optionInputs,
                results: results,
                rating: 0,
                gan: Object.assign({}, this.state.gan, {noise: noise, noiseOrigin: optionInputs.noise.value, input: noise.concat(label)})
            });
        }

        //Stat.generate(this.state.options);
        this.setState({
            gan: Object.assign({}, this.state.gan, {isRunning: false}),
        });
    }

    onModelOptionChange(key, random, value = this.state.options[key].value) {
        if (key === 'noise' && !random && !value) {
            return;
        }
        if (random) {
            this.setState({
                options: Object.assign({}, this.state.options, {
                    [key]: Object.assign({}, this.state.options[key], {random: true})
                })
            });
        }
        else {
            this.setState({
                options: Object.assign({}, this.state.options, {
                    [key]: Object.assign({}, this.state.options[key], {random: false, value: value})
                })
            });
        }
    }

    onOptionChange(key, value) {
        switch (key) {
            case 'mode':
                this.setState({mode: value});
                break;
            case 'model':
                this.setModel(value);
                break;
            case 'disableWebgl':
                this.setModel(this.state.options.currentModel, value);
                break;
            default:
                return;
        }
    }

    onOptionOperationClick(operation) {
        switch (operation) {
            case 'reset':
                return this.onResetClick();
            case 'fix_all':
                return this.onFixAllClick();
            case 'json_import':
                return this.onJSONImport();
            case 'json_export':
                return this.onJSONExport();
            default:
                return;
        }
    }

    getOptions() {
        return this.state.options;
    }

    setOptions(options) {
        return this.setState({options: options});
    }

    onJSONImport() {
        this.refs.jsonUploader.click();
    }

    importJSON(event) {
        if (!event || !event.target || !event.target.files || !event.target.files[0]) {
            return;
        }

        var file = event.target.files[0];

        var reader = new FileReader();
        reader.onload = () => {
            var json = reader.result;
            this.setOptions(JSON.parse(json));
        };
        reader.readAsText(file);
    }

    onJSONExport() {
        this.setState({optionURI: URL.createObjectURL(new Blob([JSON.stringify(this.getOptions())]))}, () => {
            this.refs.jsonDownloader.click();
        });
    }

    onResetClick() {
        this.setState({options: this.initOptions({}, this.state.options.currentModel)});
    }

    onFixAllClick() {
        let opt = Object.assign({}, this.state.options);

        Object.keys(opt).map((key, index)=>
        {

            if(opt[key] && opt[key].hasOwnProperty('random')){
                opt[key] = Object.assign({},opt[key], {random:false})
            }
            return true;
        });

        this.setState({options: opt});
    }

    shareOnTwitter() {
        localStorage['twitter_image'] = new ImageEncoder(this.getModelConfig()).encode(this.state.results.slice(-1)[0]);
        localStorage['twitter_noise'] = new ImageEncoder(this.getModelConfig()).encodeNoiseOrigin(this.state.gan.noiseOrigin);
        var win = window.open(Twitter.getAuthUrl(), '_blank');
        win.focus();
    }

    submitRating(value) {
        Stat.rate(this.state.gan.input, value);
        this.setState({rating: value});
    }

    render() {
        return (
            <div className="home">

                <div className="row main-row">
                    <div className={(this.state.twitter.visible ? 'col-lg-8 ' : '') + 'col-xs-12'}>
                        <div className="row progress-container">
                            <CSSTransitionGroup
                                transitionName="progress-transition"
                                transitionEnterTimeout={100}
                                transitionLeaveTimeout={1000}>

                                {!this.state.gan.isReady &&
                                <div className="col-xs-12">
                                    <ProgressBar value={this.state.gan.loadingProgress} />
                                    <h5 className="progress-text" style={{color: this.state.gan.isCanceled || this.state.gan.isError ? '#f00' : '#000'}}>
                                        {this.state.gan.isCanceled ? <FormattedMessage id="Canceled"/>: this.state.gan.isError ? <FormattedMessage id="NetworkError"/>: <FormattedMessage id="LoadingModel"/>}
                                    </h5>
                                </div>
                                }

                            </CSSTransitionGroup>
                        </div>

                        <div className="row">
                            <div className="col-sm-3 col-xs-12 generator-container">
                                <Generator gan={this.state.gan}
                                           modelConfig={this.getModelConfig()}
                                           results={this.state.results}
                                           onGenerateClick={() => this.generate()}
                                           onTwitterClick={() => this.shareOnTwitter()}
                                           onRatingClick={(value) => this.submitRating(value)}
                                           rating={this.state.rating}
                                />
                            </div>
                            <div className="col-sm-9 col-xs-12 options-container">
                                <Switch>
                                    <Route exact path="/" render={() =>
                                        this.state.mode === 'expert' ?
                                            <OptionsExpert
                                                modelConfig={this.getModelConfig()}
                                                inputs={this.state.options}
                                                onModelOptionChange={(key, random, value) => this.onModelOptionChange(key, random, value)}
                                                onOptionChange={(key, value) => this.onOptionChange(key, value)}
                                                onOperationClick={operation => this.onOptionOperationClick(operation)}
                                                mode={this.state.mode}
                                                webglAvailable={this.state.webglAvailable}
                                                backendName={this.state.gan.backendName} /> :
                                            <Options
                                                modelConfig={this.getModelConfig()}
                                                inputs={this.state.options}
                                                onModelOptionChange={(key, random, value) => this.onModelOptionChange(key, random, value)}
                                                onOptionChange={(key, value) => this.onOptionChange(key, value)}
                                                onOperationClick={operation => this.onOptionOperationClick(operation)}
                                                mode={this.state.mode}
                                                webglAvailable={this.state.webglAvailable}
                                                backendName={this.state.gan.backendName} />
                                    } />
                                    <Route path="/about" component={About}/>
                                    <Route path="/news" component={News}/>
                                    <Route path="/tips" component={Tips}/>
                                </Switch>

                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-xs-12" style={{display: this.state.twitter.visible ? 'block' : 'none'}}>
                        <div className="row twitter-timeline-row">
                            <div className="col-xs-12">
                                <h3 className="twitter-timeline-title" style={{color: Config.colors.theme}}>#MakeGirlsMoe on Twitter</h3>
                                <div id="twitter-timeline-container" />
                            </div>
                        </div>
                    </div>

                </div>

                <PromptDialog
                    ref={dialog => this.dialog = dialog}
                    title="Note"
                    message="You are using mobile data network. We strongly recommend you to connect to Wi-Fi when accessing this website. Are you sure to continue?" />
                <a href={this.state.optionURI} download="MakeGirlsMoe-Options.json" target="_blank" ref="jsonDownloader" style={{display: "none"}}>Download JSON</a>
                <input type="file" accept="application/json" ref="jsonUploader" style={{display: "none"}} onChange={(event) => this.importJSON(event)} onClick={(event)=> {event.target.value = null}} />

            </div>
        );
    }
}

export default Home;
