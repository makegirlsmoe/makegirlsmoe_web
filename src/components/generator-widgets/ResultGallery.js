import React, { Component } from 'react';
import Config from '../../Config';
import Gallery from 'react-grid-gallery';
import ImageEncoder from '../../utils/ImageEncoder';
import './ResultGallery.css';

class ResultGallery extends Component {
    constructor() {
        super();
        this.imageWidth = 128;
        this.imageHeight = 128;
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
                    <div className="history-overlay"
                         style={{cursor: this.props.onClick ? 'pointer' : 'auto'}}
                         onClick={() => this.props.onClick ? this.props.onClick(currentValue, this.props.resultsOptions[index], index) : null}>
                        <div className="overlay-info">
                            <div className="overlay-info-item">Model: {config.name}</div>
                            <div className="overlay-info-item">Size: {config.gan.imageWidth}x{config.gan.imageHeight}</div>
                        </div>
                        {this.props.actions &&
                            <div className="overlay-actions">
                                {this.props.actions.map(action => (
                                    <a key={action.key || action.name} className="overlay-action" onClick={() => action.onClick(currentValue, this.props.resultsOptions[index], index)}>{action.name}</a>
                                ))}
                            </div>
                        }
                    </div>
            }
        })
    }

    render() {
        return (
            <Gallery images={this.generatedResults(this.props.results)}
                     enableImageSelection={true}
                     enableLightbox={false}
                     rowHeight={this.imageHeight}
            />
        );
    }
}

export default ResultGallery;
