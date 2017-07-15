import React, { Component } from 'react';
import Config from '../Config';
import Utils from '../utils/Utils';
import BinarySelector from './BinarySelector';
import MultipleSelector from './MultipleSelector';
import './Options.css';

class Options extends Component {

    constructor(props) {
        super();
        this.options = Utils.arrayToObject(props.options, item => item.key);
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

    renderSelector(key) {
        var option = this.options[key];
        if (option.type === 'multiple') {
            return this.renderMultipleSelector(key, option.options);
        }
        else {
            return this.renderBinarySelector(key);
        }
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
                    {this.renderSelector('lips')}
                </div>
            </div>
        );
    }
}

export default Options;
