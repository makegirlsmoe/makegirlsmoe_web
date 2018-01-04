import React, { Component } from 'react';
import { FormattedMessage } from "react-intl";
import { connect } from 'react-redux';
import Config from '../../Config';
import { generatorAction } from '../../_actions';
import ButtonPrimary from '../generator-widgets/ButtonPrimary';
import ResultGallery from '../generator-widgets/ResultGallery';
import './History.css';

class History extends Component {
    constructor() {
        super();
        this.lastImageCount = 0;
    }

    componentDidUpdate() {
        var imageCount = this.props.results.length;
        if (imageCount !== this.lastImageCount) {
            var $elem = window.$('.options-container');
            window.scrollTo(0, $elem.offset().top + $elem.height() - window.innerHeight);
            this.lastImageCount = imageCount;
        }
    }

    loadImage(index) {
        this.props.dispatch(generatorAction.changeCurrentIndex(index));
    }

    loadOptions(index) {
        this.props.dispatch(generatorAction.changeGeneratorModel(this.props.resultsOptions[index].modelName));
        this.props.dispatch(generatorAction.setGeneratorOptions(this.props.resultsOptions[index]));
        this.props.dispatch(generatorAction.fixGeneratorOptions());
        this.loadImage(index);
        window.location = '#/';
    }

    render() {
        return (
            <div>
                <div className="flex flex-space-between">
                    <h3 style={{color: Config.colors.theme}}>
                        <FormattedMessage id="Generated Images"/>
                    </h3>
                    <ButtonPrimary className="title-button" text={<span><span className="glyphicon glyphicon glyphicon-menu-left btn-back-icon"/><span className="btn-back-text">Back</span></span>} onClick={() => window.location = '#/'}/>
                </div>
                <ResultGallery results={this.props.results} resultsOptions={this.props.resultsOptions}
                    onClick={(result, options, index) => this.loadImage(index)}
                    actions={[
                        {name: "Load Options", onClick: (result, options, index) => this.loadOptions(index)}
                    ]}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        results: state.generator.results,
        resultsOptions: state.generator.resultsOptions,
    };
}

export default connect(mapStateToProps)(History);
