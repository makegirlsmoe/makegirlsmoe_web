import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import {OptionsClass} from './Options';
import RandomButtons from '../generator-widgets/RandomButtons';
import SliderWithInput from '../generator-widgets/SliderWithInput';
import ButtonGroup from '../generator-widgets/ButtonGroup';
import './Options.css';
import {generatorAction } from '../../_actions';


class OptionsExpert extends OptionsClass {

    constructor(props) {
        super(props);
        this.state.expended = {};
    }

    renderBinarySelector(key, title) {
        var input = this.props.inputs[key];
        return (
            <div key={key} className={this.getClassShortOption()}>
                {this.renderLabel(key, title)}
                <RandomButtons
                    value={input.random ? 1 : 0}
                    onChange={(value) => this.props.dispatch(
                        generatorAction.modelOptionChange(key, value === 1))}/>
                <SliderWithInput value={input.value} inputMin={100} inputMax={100}
                                 onChange={value => this.props.dispatch(generatorAction.modelOptionChange(key, false, value))}
                />
            </div>
        );
    }

    renderMultipleSelector(key, options, title) {
        var input = this.props.inputs[key];
        return (
            <div key={key} className={this.getClassLongOption()}>
                <div className="row option-expert-multiple"
                     onClick={() => this.setState({expended: Object.assign({}, this.state.expended, {[key]: !this.state.expended[key]})})}>

                    <div className="col-sm-3 col-xs-4">
                        {this.renderLabel(key, title, true)}
                    </div>
                    <div className="col-xs-6">
                        <RandomButtons
                            value={input.random ? 1 : 0}
                            onChange={(value) => this.props.dispatch(
                                generatorAction.modelOptionChange(key, value === 1))}/>
                    </div>
                    <div className="col-xs-1 pull-right">
                        {this.state.expended[key] ?
                            <span className="icon-expand glyphicon glyphicon-chevron-down"/> :
                            <span className="icon-expand glyphicon glyphicon-chevron-right"/>
                        }
                    </div>
                </div>
                {this.state.expended[key] &&
                    <div className="row">
                        {options.map((option, index) =>
                            <div key={option} className="col-xs-6 col-sm-4">
                                {this.renderLabel(option)}
                                <SliderWithInput value={input.value[index]} inputMin={100} inputMax={100} onChange={value => {
                                    var newInput = input.value.slice();
                                    newInput[index] = value;
                                    this.props.dispatch(
                                        generatorAction.modelOptionChange(key, false, newInput)
                                    );
                                }}/>
                            </div>
                        )}
                    </div>
                }
                <hr/>
            </div>
        );
    }

    renderContinuousSelector(key, config, title) {
        var input = this.props.inputs[key];
        return (
            <div key={key} className={this.getClassShortOption()}>
                {this.renderLabel(key, title)}
                <RandomButtons
                    value={input.random ? 1 : 0}
                    onChange={(value) => this.props.dispatch(generatorAction.modelOptionChange(key, value === 1))}/>
                <SliderWithInput min={config.min} max={config.max} step={config.step}
                    inputMin={config.inputMin} inputMax={config.inputMax} value={input.value}
                    onChange={value => this.props.dispatch(generatorAction.modelOptionChange(key, false, value))}/>
            </div>
        );
    }

    renderOperations() {
        return (
            <div className={this.getClassLongOption()}>
                <h5><FormattedMessage id="OperationsExpertMode"/></h5>
                {new ButtonGroup().renderButtonGroup([
                    {name: 'Reset', onClick: () => this.props.dispatch(generatorAction.resetGeneratorOptions()) },
                    {name: 'Fix All', onClick: () => this.props.dispatch(generatorAction.fixGeneratorOptions()) },
                    {name: 'Options Import', onClick: () => this.props.onOperationClick('json_import')},
                    {name: 'Options Export', onClick: () => this.props.onOperationClick('json_export')}
                ])}
            </div>
        );
    }

    renderPerturbNoise() {
        return (
            <div className={this.getClassLongOption()}>
                <h5><FormattedMessage id="Perturb Current Noise"/></h5>
                <div className="flex">
                    <div>
                        {new ButtonGroup().renderButtonGroup([{
                            key: 'Purturb',
                            name: <span>Purturb</span>,
                            isDisabled: !this.props.inputs.noise.value,
                            onClick : () => {
                                this.setState({
                                    isPerturbing: true,
                                    previousNoise: this.props.inputs.noise.value
                                });
                                this.props.dispatch(generatorAction.perturbNoise(this.props.inputs.noise.value, this.state.perturbRange));
                                //this.props.dispatch(generatorAction.fixNoiseOption());
                            }
                        },{
                            key: 'Apply',
                            name: <span>Apply</span>,
                            isDisabled: !this.state.isPerturbing,
                            onClick : () => {
                                this.setState({isPerturbing: false});
                            }
                        },{
                            key: 'Revert',
                            name: <span>Revert</span>,
                            isDisabled: !this.state.isPerturbing,
                            onClick : () => {
                                this.props.dispatch(generatorAction.setNoiseValue(this.state.previousNoise));
                                this.setState({
                                    isPerturbing: false
                                });
                            }
                        }])}
                    </div>
                    <div className="flex-grow option-count-slider" >
                        <SliderWithInput min={0.01} max={0.5} step={0.01}
                                         value={this.state.perturbRange}
                                         onChange={value => this.setState({perturbRange: value})}/>
                    </div>
                </div>
            </div>
        );
    }

}
function mapStateToProps(state) {
    return {
        webglAvailable: state.generatorConfig.webglAvailable,
        webglDisabled: state.generatorConfig.webglDisabled,
        currentModel: state.generator.currentModel,
        locale: state.selectLocale.locale,
        inputs: state.generator.options,
        count: state.generatorConfig.count,
    };
}

export default connect(mapStateToProps)(OptionsExpert);
