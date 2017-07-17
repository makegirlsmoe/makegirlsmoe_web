import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Config from '../Config';
import ProgressBar from './ProgressBar';
import Generator from './Generator';
import Options from './Options';
import PromptDialog from './PromptDialog';
import GAN from '../utils/GAN';
import Utils from '../utils/Utils';
import Stat from '../utils/Stat';
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
            options: {
                amount: 1
            },
            results: []
        };
        this.gan = new GAN();
    }

    async componentDidMount() {
        Stat.init({cellularData: Utils.usingCellularData()});

        if (Utils.usingCellularData()) {
            try {
                await this.dialog.show();
            }
            catch (err) {
                this.setState({gan: Object.assign({}, this.state.gan, {isCanceled: true})});
                return;
            }
        }

        try {
            var startTime = new Date();
            await this.gan.init((current, total) => this.setState({gan: Object.assign({}, this.state.gan, {loadingProgress: current / total * 100})}));
            var endTime = new Date();
            var loadTime = (endTime.getTime() - startTime.getTime()) / 1000;
        }
        catch (err) {
            this.setState({gan: Object.assign({}, this.state.gan, {isError: true})});
            return;
        }

        Stat.modelLoaded(loadTime);
        this.setState({gan: {isReady: true}});
    }

    getLabel() {
        var label = Array.apply(null, {length: Config.gan.labelLength}).map(() => -1);
        for (var i = 0; i < Config.options.length; i++) {
            var option = Config.options[i];
            var value = this.state.options[option.key];
            if (!value) {
                if (option.type === 'multiple') {
                    var random = Math.random();
                    for (var j = 1; j <= option.options.length; j++) {
                        if (random < option.prob[j]) {
                            value = j;
                            break;
                        }
                        else {
                            random -= option.prob[j];
                        }
                    }
                }
                else {
                    value = Math.random() < option.prob ? 1 : -1;
                }
            }
            if (option.type === 'multiple') {
                label[option.offset + value - 1] = 1;
            }
            else {
                label[option.offset] = value;
            }
        }

        return label;
    }

    async generate() {
        this.setState({
            gan: Object.assign({}, this.state.gan, {isRunning: true})
        });

        for (var i = 0; i < this.state.options.amount; i++) {
            var label = this.getLabel();
            var result = await this.gan.run(label, this.state.options.noise ? this.state.gan.noise : null);
            if (i === 0) {
                this.setState({
                    results: []
                });
            }
            this.setState({
                results: this.state.results.concat([result])
            });
        }

        Stat.generate(this.state.options);
        this.setState({
            gan: Object.assign({}, this.state.gan, {isRunning: false, noise: this.gan.getCurrentNoise()})
        });
    }

    render() {
        return (
            <div className="Home">

                <div className="row progress-container">
                    <CSSTransitionGroup
                        transitionName="progress-transition"
                        transitionEnterTimeout={0}
                        transitionLeaveTimeout={1000}>

                        {!this.state.gan.isReady &&
                        <div className="col-xs-12">
                            <ProgressBar value={this.state.gan.loadingProgress} />
                            <h5 className="progress-text" style={{color: this.state.gan.isCanceled || this.state.gan.isError ? '#f00' : '#000'}}>
                                {this.state.gan.isCanceled ? 'Canceled' : this.state.gan.isError ? 'Network Error' : 'Loading Model...'}
                            </h5>
                        </div>
                        }

                    </CSSTransitionGroup>
                </div>

                <div className="row">
                    <div className="col-sm-3 col-xs-12 generator-container">
                        <Generator gan={this.state.gan} results={this.state.results} onGenerateClick={() => this.generate()} />
                    </div>
                    <div className="col-sm-9 col-xs-12 options-container">
                        <Options
                            options={Config.options}
                            values={this.state.options}
                            noise={this.state.gan.noise}
                            onChange={(key, value) => this.setState({options: Object.assign({}, this.state.options, {[key]: value})})} />
                    </div>
                </div>

                <div className="row results-container" hidden={true}>
                    <div className="col-xs-12">
                        <div className="row">
                            <h3 className="col-xs-12" style={{color: Config.colors.theme}}>Results</h3>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 result-placeholder" ref={resultPlaceholder => this.resultPlaceHolder = resultPlaceholder}></div>
                        </div>
                    </div>
                </div>

                {/*<div className="row about-container">*/}
                    {/*<div className="col-xs-12">*/}
                        {/*<div className="about">*/}
                            {/*<p>Developed By: </p>*/}
                            {/*<p>Aixile [<a href="https://github.com/aixile">github.com/aixile</a>]</p>*/}
                            {/*<p>zhangjk95 [<a href="https://github.com/zhangjk95">github.com/zhangjk95</a>]</p>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}

                <PromptDialog
                    ref={dialog => this.dialog = dialog}
                    title="Note"
                    message="You are using mobile data network. We strongly recommend you to connect to Wi-Fi when accessing this website. Are you sure to continue?" />
            </div>
        );
    }
}

export default Home;
