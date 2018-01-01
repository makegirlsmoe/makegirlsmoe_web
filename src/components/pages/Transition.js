import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generatorAction } from '../../_actions';
import { getlanguageLength } from '../../_reducers/locale.reducers';
import Utils from '../../utils/Utils';
import Config from '../../Config';
import ButtonPrimary from '../generator-widgets/ButtonPrimary';
import ResultCanvas from '../generator-widgets/ResultCanvas';
import PromptDialog from '../general/PromptDialog';
import './Transition.css';

class Transition extends Component {

    getModelConfig() {
        return Config.modelConfig[this.props.currentModel];
    }

    getImageWidth() {
        return this.getModelConfig().gan.imageWidth;
    }

    getImageHeight() {
        return this.getModelConfig().gan.imageHeight;
    }

    renderItem(result) {
        return (
            <div className="transition-item transition-start-end" style={{width: this.getImageWidth() + 3, height: this.getImageWidth() + 3}}>
                <div className="result-wrapper" style={{width: this.getImageWidth(), height: this.getImageHeight()}}>
                    {result && <ResultCanvas modelConfig={this.getModelConfig()} result={result} />}
                </div>
            </div>
        );
    }

    renderStart() {
        return this.renderItem(this.props.transition && this.props.transition.start ? this.props.transition.start.result : null);
    }

    renderEnd() {
        return this.renderItem(this.props.transition && this.props.transition.end ? this.props.transition.end.result : null);
    }

    renderMiddle(index) {
        return this.renderItem(this.props.transition && this.props.transition.middle && this.props.transition.middle[index] ? this.props.transition.middle[index].result : null);
    }

    async onSetStartImageClick() {
        if (this.props.results.length > 0) {
            this.props.dispatch(
                generatorAction.setTransitionStart(this.props.results[this.props.results.length - 1], this.props.input)
            );
        }
        else {
            await this.refs.dialog.show("Error", <span>Please <span style={{color: Config.colors.theme, fontWeight: 'bold'}}>generate</span> an image first</span>);
        }
    }

    async onSetEndImageClick() {
        if (this.props.results.length > 0) {
            this.props.dispatch(
                generatorAction.setTransitionEnd(this.props.results[this.props.results.length - 1], this.props.input)
            );
        }
        else {
            await this.refs.dialog.show("Error", <span>Please <span style={{color: Config.colors.theme, fontWeight: 'bold'}}>generate</span> an image first</span>);
        }
    }

    static interpolateNoise(a, b, value) {
        return (1 - value) * (1 - value) * a + value * value * b;
    }

    static interpolateLabel(a, b, value) {
        return (1 - value) * a + value * b;
    }

    async onGenerateClick() {
        var startInput = this.props.transition.start.input;
        var endInput = this.props.transition.end.input;
        var gan = this.props.getGan();

        this.props.setGanState({isRunning: true});
        for (var i = 1; i <= Config.transition.count; i++) {
            var value = i / (Config.transition.count + 1);
            var noise = Utils.range(this.getModelConfig().gan.noiseLength).map(index => Transition.interpolateNoise(
                    startInput.noise[index],
                    endInput.noise[index],
                    value));
            var label = Utils.range(this.getModelConfig().gan.labelLength).map(index => Transition.interpolateLabel(
                startInput.label[index],
                endInput.label[index],
                value));

            if (gan.getBackendName() === 'webgl') {
                await Utils.promiseTimeout(100, true); // XXX: wait for components to refresh
            }
            var result = await gan.run(label, noise);
            this.props.dispatch(generatorAction.appendTransitionMiddle(result, { noise, label }));
        }
        this.props.setGanState({isRunning: false});
    }

    render() {
        var notSet = !(this.props.transition && this.props.transition.start && this.props.transition.end);
        var isRunning = this.props.ganState.isRunning;
        var finished = this.props.transition && this.props.transition.middle && this.props.transition.middle.length > 0;

        return (
            <div className="transition">

                <h3 style={{color: Config.colors.theme}}>Transition</h3>
                <div className="transition-wrapper">
                    {this.renderStart()}
                    {Utils.range(Config.transition.count).map(index => this.renderMiddle(index))}
                    {this.renderEnd()}
                </div>
                <div className="transition-buttons">
                    <ButtonPrimary
                        className={"btn-primary-" + getlanguageLength(this.props.locale)}
                        text="Set Start Image"
                        onClick={() => this.onSetStartImageClick()} />
                    <ButtonPrimary
                        className={"btn-primary-" + getlanguageLength(this.props.locale)}
                        text="Set End Image"
                        onClick={() => this.onSetEndImageClick()} />
                    <ButtonPrimary
                        className={"btn-primary-" + getlanguageLength(this.props.locale) + " btn-transition-generate"}
                        text={isRunning ? 'Generating...' : finished ? 'Finished' : 'Generate Transition'}
                        disabled={notSet || isRunning || finished}
                        onClick={() => this.onGenerateClick()} />
                </div>

                <PromptDialog ref="dialog" type="alert" />

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        disableWebgl: state.generatorConfig.webglDisabled,
        currentModel: state.generator.currentModel,
        options: state.generator.options,
        results: state.generator.results,
        input: state.generator.input,
        transition: state.generator.transition
    };
}

export default connect(mapStateToProps)(Transition);
