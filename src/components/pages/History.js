import React, { Component } from 'react';
import { FormattedMessage } from "react-intl";
import { connect } from 'react-redux';
import Utils from '../../utils/Utils';
import Config from '../../Config';
import Gallery from 'react-grid-gallery';
import ImageEncoder from '../../utils/ImageEncoder';
import { generatorAction } from '../../_actions';
import { getlanguageLength } from '../../_reducers/locale.reducers';
import ButtonGroup from '../generator-widgets/ButtonGroup';
import './History.css';

class History extends Component {
    constructor() {
        super();
        this.state = {
            loadSetting:false
        };
        this.imageWidth = 128;
        this.imageHeight = 128;
    }

    componentDidUpdate() {
        var rect = window.$('.options-container')[0].getBoundingClientRect();
        window.scrollTo(0, rect.top + rect.height - window.innerHeight);
    }

    generatedResults(images){
        return images.map((currentValue, index) => {
            let modelName = this.props.resultsOptions[index].modelName;
            let config = Config.modelConfig[modelName];
            let encoder = new ImageEncoder(config);
            let encoded = encoder.encode(currentValue);
            return {
                src: encoded,
                thumbnail: encoded,
                thumbnailWidth: this.imageWidth,
                thumbnailHeight: this.imageHeight,
                customOverlay:
                    <div className="history-overlay" onClick={() => this.loadImage(index)}>
                        <div className="overlay-info">
                            <div className="overlay-info-item">Model: {config.name}</div>
                            <div className="overlay-info-item">Size: {config.gan.imageWidth}x{config.gan.imageHeight}</div>
                        </div>
                        <div className="overlay-actions">
                            <a className="overlay-action" onClick={() => this.loadOptions(index)}>Load Options</a>
                        </div>
                    </div>
            }
        })
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
                <div>
                    <h3 style={{color: Config.colors.theme}}>
                        <FormattedMessage id="Generated Images"/>
                    </h3>
                </div>
                <Gallery images={this.generatedResults(this.props.results)}
                         enableImageSelection={true}
                         enableLightbox={false}
                         rowHeight={this.imageHeight}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        results: state.generator.results,
        resultsOptions: state.generator.resultsOptions,
        currentModel: state.generator.currentModel,
        //currentIndex: state.generator.currentIndex,
        //resultsOptions: state.generator.
    };
}

export default connect(mapStateToProps)(History);
