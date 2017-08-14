import React, { Component } from 'react';
import Config from '../Config';
import Utils from '../utils/Utils';
import BinarySelector from './BinarySelector';
import MultipleSelector from './MultipleSelector';
import NoiseSelector from './NoiseSelector';
import NoiseVisualizer from './NoiseVisualizer';
import './Options.css';
import ButtonPrimary from './ButtonPrimary';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';

class Options extends Component {

    constructor(props) {
        super();
        this.options = Utils.arrayToObject(props.options, item => item.key);
        this.props = {noise: '', copied: false};
        // this.props.copied = false
        // this.props.on
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
    //
    // onChange({target: {value}}) {
    //   // this.state = {value: '', copied: false};
    //   return this.props.copied = false
    // }
    //
    // onCopy() {
    //   // this.state = {value: '', copied: true};
    //   return this.props.copied = true
    // }

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
                    <CopyToClipboard text={this.props.noise} onCopy={() => {
                      this.setState({copied: true});
                    }}>
                      <ButtonPrimary
                        text={'Copy Noise to Clipboard'}
                        onClick={this.props.onGenerateClick} />
                    </CopyToClipboard>
                    {this.props.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
                </div>
            </div>
        );
    }
}

export default Options;

export class CopyToClipboard extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    onCopy: PropTypes.func,
    options: PropTypes.shape({
      debug: PropTypes.bool,
      message: PropTypes.string
    })
  };

  onClick = event => {
    const {
      text,
      onCopy,
      children,
      options
    } = this.props;

    const elem = React.Children.only(children);

    const result = copy(text, options);

    if (onCopy) {
      onCopy(text, result);
    }

    // Bypass onClick if it was present
    if (elem && elem.props && typeof elem.props.onClick === 'function') {
      elem.props.onClick(event);
    }
  };

  render() {
    const {
      text: _text,
      onCopy: _onCopy,
      options: _options,
      children,
      ...props
    } = this.props;
    const elem = React.Children.only(children);

    return React.cloneElement(elem, {...props, onClick: this.onClick});
  }
}