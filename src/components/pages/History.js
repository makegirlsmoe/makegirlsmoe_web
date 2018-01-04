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

class History extends Component {
    constructor() {
        super();
        this.state = {
            loadSetting:false
        }
    }
    generatedResults(images){
        let config = Config.modelConfig[this.props.currentModel];
        let encoder = new ImageEncoder(config);
        return images.map((currentValue, index)=>{
               let encoded = encoder.encode(currentValue);
               return {
                   src: encoded,
                   thumbnail: encoded,
                   thumbnailWidth: 128,
                   thumbnailHeight: 128,
               }
            }
        )
    }



    renderLoadingSettingButton() {
        return (
            <div >
                <h5><FormattedMessage id="Load input when clicked"/></h5>
                {new ButtonGroup().renderButtonGroup([
                    {name: 'Disabled', isActive: !this.state.loadSetting,
                        onClick: () => this.setState({
                            loadSetting: false
                        })
                    },
                    {name: 'Enabled', isActive: this.state.loadSetting,
                        onClick: () => this.setState({
                            loadSetting: true
                        })
                    }
                ])}
            </div>
        );
    }

    render() {
        return (
            <div>

                <div>
                    <h3 style={{color: Config.colors.theme}}>
                        <FormattedMessage id="Generated Images"/>
                    </h3>
                </div>
                {this.renderLoadingSettingButton()}
                <p/>
                <Gallery images={this.generatedResults(this.props.results)}  enableImageSelection={false} enableLightbox={false}
                     onClickThumbnail={(index)=>{
                         console.log(index);
                         this.props.dispatch(generatorAction.changeCurrentIndex(index));
                         if(this.state.loadSetting){
                             this.props.dispatch(generatorAction.setGeneratorOptions(this.props.resultsOptions[index]));
                             this.props.dispatch(generatorAction.fixGeneratorOptions());
                         }
                     }}

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
