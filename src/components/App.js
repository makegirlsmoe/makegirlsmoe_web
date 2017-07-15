import React, { Component } from 'react';
import Config from '../Config';
import Generator from './Generator';
import Options from './Options';
import GAN from '../utils/GAN';
import Utils from '../utils/Utils';
import ProgressBar from './ProgressBar';
import { CSSTransitionGroup } from 'react-transition-group';
import './App.css';
import PromptDialog from './PromptDialog';

class App extends Component {

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
            await this.gan.init((current, total) => this.setState({gan: Object.assign({}, this.state.gan, {loadingProgress: current / total * 100})}));
        }
        catch (err) {
            this.setState({gan: Object.assign({}, this.state.gan, {isError: true})});
            return;
        }

        this.setState({gan: {isReady: true}});
    }

    getLabel() {
        var label = Array.apply(null, {length: Config.gan.labelLength}).map(() => -1);
        for (var i = 0; i < Config.options.length; i++) {
            var option = Config.options[i];
            var value = this.state.options[option.key];
            if (!value) {
                if (option.type === 'multiple') {
                    value = Utils.randomInt(1, option.options.length);
                }
                else {
                    value = Utils.randomInt(0, 1) * 2 - 1;
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
            var result = await this.gan.run(label);
            if (i === 0) {
                this.setState({
                    results: []
                });
            }
            this.setState({
                results: this.state.results.concat([result])
            });
        }

        this.setState({
            gan: Object.assign({}, this.state.gan, {isRunning: false})
        });
    }

    render() {
        return (
            <div className="App">
                <PromptDialog
                    ref={dialog => this.dialog = dialog}
                    title="Note"
                    message="You are using mobile data network. We strongly recommend you to access this website while connected to Wi-Fi. Are you sure to continue?" />
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
                            onChange={(key, value) => this.setState({options: Object.assign({}, this.state.options, {[key]: value})})} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
