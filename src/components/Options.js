import React, { Component } from 'react';
import { ReactHintFactory } from 'react-hint';
import { FormattedMessage } from "react-intl";
import 'react-hint/css/index.css';
import Config from '../Config';
import Utils from '../utils/Utils';
import BinarySelector from './BinarySelector';
import MultipleSelector from './MultipleSelector';
import NoiseSelector from './NoiseSelector';
import NoiseVisualizer from './NoiseVisualizer';
import ButtonGroup from './ButtonGroup';
import ImageDecoder from '../utils/ImageDecoder';
import PromptDialog from './PromptDialog';
import Dropdown from './Dropdown';
import LabelHelper from './LabelHelper';
import './Options.css';

const ReactHint = ReactHintFactory(React);

class Options extends Component {

    constructor(props) {
        super();
        this.options = Utils.arrayToObject(props.modelConfig.options, item => item.key);
        this.state = {};
    }


    componentWillReceiveProps(newProps) {
        this.options = Utils.arrayToObject(newProps.modelConfig.options, item => item.key);
    }

    onNoiseImportClick() {
        this.refs.noiseUploader.click();
    }

    onNoiseExportClick() {
        if (!this.props.inputs.noise.value) {
            return;
        }

        this.alertDialog.show('Noise Export',
            <div>
                <p>
                    Please save the image below. <br />
                    For PC User: Right-click on the image and click "Save Image As". <br />
                    For Mac User: Click on the image and drag to desktop or desired folder.<br />
                    For Mobile Device User: Touch and hold the image, and tap "Save Image"<br />
                </p>
                <p>
                    <b>Note: Conditions such as hair color, whether random or specified, are NOT included in the noise. Try generating images with fixed noise and different conditions!</b>
                </p>
                Noise Image:
                <NoiseVisualizer modelConfig={this.props.modelConfig} noise={this.props.inputs.noise.value}/>
            </div>
        );
    }

    readNoise(event) {
        if (!event || !event.target || !event.target.files || !event.target.files[0]) {
            return;
        }

        var file = event.target.files[0];

        var reader = new FileReader();
        reader.onload = () => {
            var dataURL = reader.result;
            new ImageDecoder(this.props.modelConfig).DecodeNoiseOrigin(dataURL).then(noise => {
                this.props.onModelOptionChange('noise', false, noise);
                this.alertDialog.show('Noise Import', 'Import Successful.');
            }).catch(err => {
                this.alertDialog.show('Import Error', err.error);
            });
        };
        reader.readAsDataURL(file);
    }

    renderLabel(key, title, large = false) {
        if (!large) {
            return (
                <h5>
                    <FormattedMessage id={title || Utils.keyToString(key)}/>
                </h5>
            );
        }
        else {
            return (
                <h4>
                    <FormattedMessage id={title || Utils.keyToString(key)}/>
                </h4>
            );
        }
    }

    isBinaryOptionSimple(option) {
        return option.random || option.value === 1 || option.value === -1;
    }

    renderBinarySelector(key, title) {
        var input = this.props.inputs[key];
        return (
            <div key={key}  className="col-xs-6 col-sm-4 option">
                {this.renderLabel(key, title)}
                {(this.isBinaryOptionSimple(input) &&
                    <BinarySelector
                        value={input.random ? 0 : input.value}
                        onChange={(value) => this.props.onModelOptionChange(key, value === 0, value)} />) ||
                    <span><i>(User-defined)</i></span>}
            </div>
        );
    }

    isMultipleOptionSimple(option) {
        return option.random
            || (option.value.filter(v => v === 1).length === 1
                && option.value.filter(v => v === 1 || v === -1).length === option.value.length)
    }

    renderMultipleSelector(key, options, title) {
        var input = this.props.inputs[key];
        return (
            <div key={key} className="col-xs-6 col-sm-4 option">
                {this.renderLabel(key, title)}
                {(this.isMultipleOptionSimple(input) &&
                    <MultipleSelector
                        options={options}
                        value={input.random ? 0 : input.value.indexOf(1) + 1}
                        onChange={(value) => this.props.onModelOptionChange(key, value === 0, Array.apply(null, {length: options.length}).map((item, index) => index === value - 1 ? 1 : -1))} />) ||
                    <span><i>(User-defined)</i></span>}
            </div>
        );
    }

    renderContinousSelector(key, options, titls) {

    }

    renderNoiseSelector() {
        return (
            <div className="col-xs-6 col-sm-4 option">
                {this.renderLabel('noise')}
                <NoiseSelector value={this.props.inputs.noise.random ? 0 : 1} onChange={(value) => this.props.onModelOptionChange('noise', value === 0)} />
            </div>
        );
    }

    renderSelector(key) {
        var option = this.options[key];
        if (option.type === 'multiple') {
            return this.renderMultipleSelector(key, option.options);
        }else
        else {
            return this.renderBinarySelector(key);
        }
    }

    renderNoiseVisualizer() {
        return (
            <div className="col-xs-6 col-sm-4 option">
                <h5><FormattedMessage id="CurrentNoise"/></h5>
                <NoiseVisualizer modelConfig={this.props.modelConfig} noise={this.props.inputs.noise.value} />
            </div>
        );
    }

    renderNoiseImportExport() {
        return (
            <div className="col-xs-6 col-sm-4 option">
                <h5><FormattedMessage id="NoiseImportExport"/></h5>
                {new ButtonGroup().renderButtonGroup([
                    {name: 'Import', onClick: () => this.onNoiseImportClick()},
                    {name: 'Export', onClick: () => this.onNoiseExportClick()}
                ])}
                <input type="file" accept="image/*" ref="noiseUploader" style={{display: "none"}} onChange={(event) => this.readNoise(event)} onClick={(event)=> {event.target.value = null}} />
            </div>
        )
    }

    renderOperations() {
        return (
            <div className="col-xs-6 col-sm-4 option">
                <h5><FormattedMessage id="Operations"/></h5>
                {new ButtonGroup().renderButtonGroup([
                    {name: 'Reset', onClick: () => this.props.onOperationClick('reset')}
                ])}
            </div>
        );
    }

    renderModelSelector() {
        return (
            <div className="col-xs-12 col-sm-12 option">
                <h5>Model</h5>
                <Dropdown
                    options={Config.modelList}
                    value={this.props.inputs.currentModel}
                    onChange={(value) => this.props.onOptionChange('model', value)} />
            </div>
        );
    }

    renderWebglOption() {
        return (
            this.props.webglAvailable &&
            <div className="col-xs-6 col-sm-4 option">
                <h5>WebGL <LabelHelper mesg="WebGLHelper"/></h5>
                {new ButtonGroup().renderButtonGroup([
                    {name: 'Disabled', isActive: this.props.inputs.disableWebgl, onClick: () => this.props.onOptionChange('disableWebgl', true)},
                    {name: 'Enabled', isActive: !this.props.inputs.disableWebgl, onClick: () => this.props.onOptionChange('disableWebgl', false)}
                ])}
            </div>
        );
    }

    renderBackendName() {
        var backendNameDict = {'webgpu': 'WebGPU', 'webgl': 'WebGL', 'webassembly': 'WebAssembly'};
        return (
            this.props.backendName &&
            <div className="col-xs-6 col-sm-4 option">
                <h5><FormattedMessage id="CurrentBackend"/></h5>
                <span>{backendNameDict[this.props.backendName] || 'Unknown'}</span>
            </div>
        );
    }

    renderAllOptions(){
        return Object.keys(this.options).map(item => this.renderSelector(item));
    }

    render() {
        return (
            <div className="options">
                <div className="row">
                    <h3 className="col-xs-4 col-sm-2" style={{color: Config.colors.theme}}>Options</h3>
                    <span className="col-xs-6 mode-selector">
                        <input type="checkbox" checked={this.props.mode === 'expert'} onChange={event => this.props.onOptionChange('mode', event.target.checked ? 'expert' : 'normal')} />
                        <span><FormattedMessage id="ExpertMode"/></span>
                    </span>
                </div>
                <div className="row">
                    {this.renderModelSelector()}
                </div>
                <div className="row">
                    {this.renderAllOptions()}
                </div>
                <div className="row">
                    {this.renderNoiseSelector()}
                    {this.props.inputs.noise.value && this.renderNoiseVisualizer()}
                    {this.renderNoiseImportExport()}
                </div>
                <div className="row">
                    {this.renderOperations()}
                    {this.renderWebglOption()}
                    {this.renderBackendName()}
                </div>

                <PromptDialog type="alert" ref={dialog => this.alertDialog = dialog} />
                <ReactHint events delay={100} />
            </div>
        );
    }
}

export default Options;