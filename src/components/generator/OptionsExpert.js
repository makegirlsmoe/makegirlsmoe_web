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
                <SliderWithInput value={input.value}
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
                                <SliderWithInput value={input.value[index]} onChange={value => {
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

    renderContinuousSelector(key, min, max, step, title) {
        var input = this.props.inputs[key];
        return (
            <div key={key} className={this.getClassShortOption()}>
                {this.renderLabel(key, title)}
                <RandomButtons
                    value={input.random ? 1 : 0}
                    onChange={(value) => this.props.onModelOptionChange(key, value === 1)}/>
                <SliderWithInput min={min} max={max} step={step} value={input.value} onChange={value => this.props.dispatch(generatorAction.modelOptionChange(key, false, value))}/>
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
}
function mapStateToProps(state) {
    return {
        webglAvailable: state.generatorConfig.webglAvailable,
        webglDisabled: state.generatorConfig.webglDisabled,
        currentModel: state.generator.currentModel,
        locale: state.selectLocale.locale,
        inputs: state.generator.options,
    };
}

export default connect(mapStateToProps)(OptionsExpert);
