import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import { CSSTransitionGroup } from 'react-transition-group';
import Config from '../Config';
import Transition from './pages/Transition';
import History from './pages/History';
import License from './pages/License';
import About from './pages/About';
import News from './pages/News';
import Tips from './pages/Tips';
import LogIn from './user/LogIn';
import SignUp from './user/SignUp';
import SavedImages from './user/Library';
import ProgressBar from './generator-widgets/ProgressBar';
import Generator from './generator/Generator';
import Options from './generator/Options';
import OptionsExpert from './generator/OptionsExpert';
import PromptDialog from './dialogs/PromptDialog';
import GAN from '../utils/GAN';
import Utils from '../utils/Utils';
import Stat from '../utils/Stat';
import ImageEncoder from '../utils/ImageEncoder';
import Twitter from '../utils/Twitter';
import './Home.css';
import {twitterAction, generatorAction, generatorConfigAction } from '../_actions';

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
            //options: {},
            //results: [],
            rating: 0,
            mode: 'normal',
        };
        //this.initOptions(this.state.options, Config.defaultModel);
        this.ganDict = {};
    }

    getModelConfig() {
        return Config.modelConfig[this.props.currentModel];
    }

    setModel(modelName=this.props.currentModel, disableWebgl=this.props.disableWebgl) {
        return new Promise((resolve, reject) => {
            var keyName = modelName + (disableWebgl ? '_nowebgl' : '');

           // var options = this.state.options;

            //if (!this.state.options || this.props.currentModel !== modelName) {
            //    options = this.initOptions({}, modelName);
            //    this.setState({results: []});
            //}

            //this.setState({options: Object.assign(options, {disableWebgl: disableWebgl})});

            if (!this.ganDict[keyName]) {
                var gan = new GAN(Config.modelConfig[modelName]);
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
                this.props.dispatch(
                    generatorConfigAction.setWebGLAvailability(true)
                );
                //this.setState({webglAvailable: true});
            }

            var textureSize = GAN.getWebglTextureSize();
            if (!(textureSize === null || textureSize < 16000)) {
                this.props.dispatch(
                    generatorConfigAction.enableWebGL()
                );
            }

            this.props.dispatch(generatorConfigAction.setCount(1));

            var startTime = new Date();
            await this.setModel();
            var endTime = new Date();
            var loadTime = (endTime.getTime() - startTime.getTime()) / 1000;
            Stat.modelLoaded(loadTime);
        }
        catch (err) {
            console.log(err);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.disableWebgl !== this.props.disableWebgl) {
            this.setModel(this.props.currentModel, nextProps.disableWebgl)
        }
        if (nextProps.currentModel !== this.props.currentModel){
            this.setModel(nextProps.currentModel)
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
                this.props.dispatch(
                    twitterAction.enableTwitterTimeline()
                );
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
                else if (option.type === 'continuous') {
                    var min = option.samplingMin || option.min;
                    var max = option.samplingMax || option.max;
                    optionInput.value = Math.floor(Math.random() * ((max - min) / option.step + 1)) * option.step + min;
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

    setGanState(state) {
        this.setState({
            gan: { ...this.state.gan, ...state }
        });
    }

    async remoteGenerate(input){
        let url = 'http://127.0.0.1:5555/generate/' + this.props.currentModel;
        console.log(url);
        let opt = JSON.stringify(input);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: opt
        };

        let response = await fetch(url, requestOptions);
        let json_text = await response.json();
        //console.log(json_text);
        return json_text.data;
    }

    async generate() {
        this.setGanState({isRunning: true});

        for (var i = 0; i < this.props.count; i++) {
            if (this.gan.getBackendName() === 'webgl') {
                await Utils.promiseTimeout(100, true); // XXX: wait for components to refresh
            }

            var optionInputs = this.getRandomOptionValues(this.props.options);
            var label = Utils.getLabel(optionInputs, this.getModelConfig());
            var noise = Utils.getNoise(optionInputs);
            if (!this.props.remoteComputing) {
                var result = await this.gan.run(label, noise);
            }
            else{
                try{
                    var result = await this.remoteGenerate(optionInputs);
                    result = new Float32Array(result);
                }catch(e){
                    console.log(e);
                    this.setGanState({isRunning: false});
                }
            }

            if (this.props.count > 1 && i === 0) {
                window.location = '#/history';
            }

            optionInputs.modelName=this.props.currentModel;
            //console.log(result);

            this.props.dispatch(
                generatorAction.setGeneratorOptions(optionInputs)
            );
            this.props.dispatch(
                generatorAction.setGeneratorInput({ noise: noise, label: label, noiseOrigin: optionInputs.noise.value })
            );
            this.props.dispatch(
                generatorAction.appendResult(result, optionInputs, true)//, i!==0)
            );

            this.setState({
                rating: 0
            });

            this.setGanState({noise: noise, noiseOrigin: optionInputs.noise.value, input: noise.concat(label)});
        }

        //Stat.generate(this.state.options);
        this.setGanState({isRunning: false});
    }
    /*
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
    }*/

    onOptionChange(key, value) {
        switch (key) {
            case 'mode':
                this.setState({mode: value});
                break;
            default:
                return;
        }
    }

    onOptionOperationClick(operation) {
        switch (operation) {
            case 'json_import':
                return this.onJSONImport();
            case 'json_export':
                return this.onJSONExport();
            default:
                return;
        }
    }

    getOptions() {
        return this.props.options;
    }

    setOptions(options) {
        return this.props.dispatch(generatorAction.setGeneratorOptions(options));
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
            this.props.dispatch(generatorAction.fixGeneratorOptions());
        };
        reader.readAsText(file);
    }

    //loadJSONContent

    onJSONExport() {
        this.setState({optionURI: URL.createObjectURL(new Blob([JSON.stringify(this.getOptions())]))}, () => {
            this.refs.jsonDownloader.click();
        });
    }

    shareOnTwitter() {
        localStorage['twitter_image'] = new ImageEncoder(this.getModelConfig()).encode(this.props.results.slice(-1)[0]);
        localStorage['twitter_noise'] = new ImageEncoder(this.getModelConfig()).encodeNoiseOrigin(this.state.gan.noiseOrigin);
        var win = window.open(Twitter.getAuthUrl(), '_blank');
        win.focus();
    }

    submitRating(value) {
        Stat.rate(this.state.gan.input, value);
        this.setState({rating: value});
    }

    getSizeLevel() {
        var modelConfig = this.props.currentIndex !== -1 ?
            Config.modelConfig[this.props.resultsOptions[this.props.currentIndex].modelName] :
            this.getModelConfig();
        var imageWidth = modelConfig.gan.imageWidth;

        if (imageWidth <= 200) {
            return 'small';
        }
        else {
            return 'large';
        }
    }

    getClassGeneratorContainer() {
        var sizeLevel = this.getSizeLevel();

        if (sizeLevel === 'small') {
            return 'col-sm-4 col-xs-12 generator-container';
        }
        else {
            return 'col-md-4 col-sm-5 col-xs-12 generator-container';
        }
    }

    getClassOptionsContainer() {
        var sizeLevel = this.getSizeLevel();

        if (sizeLevel === 'small') {
            return 'col-sm-8 col-xs-12 options-container';
        }
        else {
            return 'col-md-8 col-sm-7 col-xs-12 options-container';
        }
    }

    render() {
        //console.log(this.props.options);
        return (
            <div className="home">

                <div className="row main-row">
                    <div className={(this.props.twitterVisible ? 'col-lg-9 ' : '') + 'col-xs-12'}>
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
                            <div className={this.getClassGeneratorContainer()}>
                                <Generator gan={this.state.gan}
                                           modelConfig={this.getModelConfig()}
                                           //results={this.state.results}
                                           onGenerateClick={() => this.generate()}
                                           onTwitterClick={() => this.shareOnTwitter()}
                                           onRatingClick={(value) => this.submitRating(value)}
                                           rating={this.state.rating}
                                />
                            </div>
                            <div className={this.getClassOptionsContainer()}>
                                <Switch>
                                    <Route exact path="/" render={() =>
                                        this.state.mode === 'expert' ?
                                            <OptionsExpert
                                                modelConfig={this.getModelConfig()}
                                                //inputs={this.state.options}
                                                //onModelOptionChange={(key, random, value) => this.onModelOptionChange(key, random, value)}
                                                onOptionChange={(key, value) => this.onOptionChange(key, value)}
                                                onOperationClick={operation => this.onOptionOperationClick(operation)}
                                                mode={this.state.mode}
                                                //webglAvailable={this.state.webglAvailable}
                                                backendName={this.state.gan.backendName} /> :
                                            <Options
                                                modelConfig={this.getModelConfig()}
                                                //inputs={this.state.options}
                                                //onModelOptionChange={(key, random, value) => this.onModelOptionChange(key, random, value)}
                                                onOptionChange={(key, value) => this.onOptionChange(key, value)}
                                                onOperationClick={operation => this.onOptionOperationClick(operation)}
                                                mode={this.state.mode}
                                                //webglAvailable={this.state.webglAvailable}
                                                backendName={this.state.gan.backendName} />
                                    } />
                                    <Route path="/transition" render={() =>
                                        <Transition getGan={() => this.gan} ganState={this.state.gan} setGanState={(state) => this.setGanState(state)} />
                                    }/>
                                    <Route path="/license" component={License}/>
                                    <Route path="/about" component={About}/>
                                    <Route path="/news" component={News}/>
                                    <Route path="/tips" component={Tips}/>
                                    <Route path="/history" component={History}/>
                                    /*<Route path="/signup" component={SignUp}/>*/
                                    /*<Route path="/login" component={LogIn}/>*/
                                    <Route path="/library" component={SavedImages}/>
                                </Switch>

                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-xs-12" style={{display: this.props.twitterVisible ? 'block' : 'none'}}>
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


function mapStateToProps(state) {
    return {
        twitterVisible: state.twitter.visible,
        disableWebgl: state.generatorConfig.webglDisabled,
        currentModel: state.generator.currentModel,
        remoteComputing: state.generatorConfig.remoteComputing,
        options: state.generator.options,
        results: state.generator.results,
        currentIndex:  state.generator.currentIndex,
        resultsOptions: state.generator.resultsOptions,
        count: state.generatorConfig.count,
    };
}

export default connect(mapStateToProps)(Home);