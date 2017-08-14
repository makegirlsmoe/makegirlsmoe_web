import React, { Component } from 'react';
import Config from '../Config';
import Utils from '../utils/Utils';
import BinarySelector from './BinarySelector';
import MultipleSelector from './MultipleSelector';
import NoiseSelector from './NoiseSelector';
import NoiseVisualizer from './NoiseVisualizer';
import ButtonGroup from './ButtonGroup';
import ImageDecoder from '../utils/ImageDecoder';
import PromptDialog from './PromptDialog';
import './Options.css';

class Options extends Component {

    constructor(props) {
        super();
        this.options = Utils.arrayToObject(props.options, item => item.key);
    }

    onNoiseImportClick() {
        this.refs.noiseUploader.click();
    }

    onNoiseExportClick() {
        if (!this.props.noise) {
            return;
        }

        this.alertDialog.show('Noise Export',
            <div>
                <p>
                    Please save the image below. <br />
                    For PC User: Right-click on the image and click "Save Image As". <br />
                    For Mac User: Click on the image and drag to desktop or desired folder.<br />
                    For Mobile Device User: Touch and hold the image, and tap "Save Image"
                </p>
                Noise Image:
                <NoiseVisualizer noise={this.props.noise}/>
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
            ImageDecoder.DecodeNoiseOrigin(dataURL).then(noise => {
                this.props.onNoiseLoad(noise);
                this.alertDialog.show('Noise Import', 'Import Successful.');
            }).catch(err => {
                this.alertDialog.show('Import Error', err.error);
            });
        };
        reader.readAsDataURL(file);
    }

    renderLabel(key, title) {
        return (
            <h5>{title || Utils.keyToString(key)}</h5>
        );
    }

    renderBinarySelector(key, title) {
        return (
            <div className="col-xs-6 col-sm-4 option">
                {this.renderLabel(key, title)}
                <BinarySelector value={this.props.values[key]} onChange={(value) => this.props.onChange(key, value)} />
            </div>
        );
    }

    renderMultipleSelector(key, options, title) {
        return (
            <div className="col-xs-6 col-sm-4 option">
                {this.renderLabel(key, title)}
                <MultipleSelector options={options}  value={this.props.values[key]} onChange={(value) => this.props.onChange(key, value)} />
            </div>
        );
    }

    renderNoiseSelector(key, title) {
        return (
            <div className="col-xs-6 col-sm-4 option">
                {this.renderLabel(key, title)}
                <NoiseSelector value={this.props.values[key]} onChange={(value) => this.props.onChange(key, value)} />
            </div>
        );
    }

    renderSelector(key) {
        var option = this.options[key];
        if (option.type === 'multiple') {
            return this.renderMultipleSelector(key, option.options);
        }
        else {
            return this.renderBinarySelector(key);
        }
    }

    renderNoiseVisualizer() {
        return (
            <div className="col-xs-6 col-sm-4 option">
                <h5>Current Noise</h5>
                <NoiseVisualizer noise={this.props.noise} />
            </div>
        );
    }

    renderNoiseImportExport() {
        return (
            <div className="col-xs-6 col-sm-4 option">
                <h5>Noise Import/Export</h5>
                {new ButtonGroup().renderButtonGroup([
                    {name: 'Import', onClick: () => this.onNoiseImportClick()},
                    {name: 'Export', onClick: () => this.onNoiseExportClick()}
                ])}
                <input type="file" accept="image/*" ref="noiseUploader" style={{display: "none"}} onChange={(event) => this.readNoise(event)} onClick={(event)=> {event.target.value = null}} />
            </div>
        )
    }

    render() {
        return (
            <div className="options">
                <div className="row">
                    <h3 className="col-xs-12" style={{color: Config.colors.theme}}>Options</h3>
                </div>
                <div className="row">
                    {this.renderSelector('hair_color')}
                    {this.renderSelector('hair_style')}
                    {this.renderSelector('eye_color')}
                </div>
                <div className="row">
                    {this.renderSelector('blush')}
                    {this.renderSelector('smile')}
                    {this.renderSelector('open_mouth')}
                    {this.renderSelector('hat')}
                    {this.renderSelector('ribbon')}
                    {this.renderSelector('glasses')}
                </div>
                <div className="row">
                    {this.renderNoiseSelector('noise')}
                    {this.props.noise && this.renderNoiseVisualizer()}
                    {this.renderNoiseImportExport()}
                </div>

                <PromptDialog type="alert" ref={dialog => this.alertDialog = dialog} />
            </div>
        );
    }
}

export default Options;