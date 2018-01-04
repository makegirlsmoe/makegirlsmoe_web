import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import { CSSTransitionGroup } from 'react-transition-group';
import Config from '../../Config';
import ButtonPrimary from '../generator-widgets/ButtonPrimary';
import ResultCanvas from '../generator-widgets/ResultCanvas';
import RatingButtons from '../generator-widgets/RatingButtons';
import twitterLogo from '../../img/Twitter_bird_logo_2012.svg';
import './Generator.css';
import ButtonGeneral from "../generator-widgets/ButtonGeneral";

class Generator extends Component {

    onRatingClick(value) {
        this.props.onRatingClick(value);
    }

    onAddToFavoriteClick(value) {

    }

    getModelConfig() {
        return this.props.currentIndex !== -1 ?
            Config.modelConfig[this.props.resultsOptions[this.props.currentIndex].modelName] :
            this.props.modelConfig;
    }

    renderResultCanvas(result, index) {
        //console.log(result, index, this.props.currentIndex);
        if(index !== this.props.currentIndex){
            return ;
        }
        return (
            <div key={index} className="result-container" style={{zIndex: 1000 + index}}>
                <ResultCanvas modelConfig={this.getModelConfig()} result={result} />
            </div>
        );
    }

    render() {
        var modelConfig = this.getModelConfig();
        var resultWrapperStyle = {
            height: modelConfig.gan.imageHeight,
            width: modelConfig.gan.imageWidth
        };
        return (

            <div className="generator">
                <div className="result-wrapper" style={resultWrapperStyle}>
                    {this.props.results ? this.props.results.map((result, index) => this.renderResultCanvas(result, index)) : null}
                </div>
                <ButtonPrimary
                    text={this.props.gan.isRunning ? 'Generating': 'Generate' }
                    disabled={this.props.gan.isRunning || !this.props.gan.isReady}
                    onClick={this.props.onGenerateClick} />

                <div style={{display: this.props.user ? 'block' : 'none'}}>
                    <p></p>
                    <ButtonGeneral
                        text={'Add to favorite'}
                        onClick={this.onAddToFavoriteClick}
                    />
                </div>


                <CSSTransitionGroup
                    transitionName="rating-transition"
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={600}>

                    <div style={{display: this.props.failed ? 'block' : 'none', color:'red'}}>
                        <FormattedMessage id="FailedGenerating"
                                          values={{webgl: <FormattedMessage id="WebGLAcceleration" />,
                                              optionmenu: <FormattedMessage id="OptionsMenu"/>}}
                        />
                    </div>

                    {this.props.results.length > 0 &&
                    <div className="rating btn-rating">
                        <div className="rating-text" style={{color: this.props.rating === 0 ? 'black' : 'green' }}>{this.props.rating === 0 ? '' : 'Thank you!'}</div>
                        <RatingButtons value={this.props.rating} onChange={(value) => this.onRatingClick(value)}/>
                    </div>
                    }

                </CSSTransitionGroup>


                <CSSTransitionGroup
                    transitionName="twitter-transition"
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={600}>

                    {this.props.results.length > 0 &&
                    <button
                        className="btn btn-default btn-twitter"
                        onClick={this.props.onTwitterClick} >
                        <img className="twitter-logo" src={twitterLogo} alt="Twitter Logo" />
                        <span>Share on Twitter</span>
                    </button>
                    }

                </CSSTransitionGroup>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        locale: state.selectLocale.locale,
        currentIndex:  state.generator.currentIndex,
        results: state.generator.results,
        resultsOptions: state.generator.resultsOptions,
        failed: state.generator.failedGenerating,
        user: state.authentication.user.user,
    };
}

export default connect(mapStateToProps)(Generator);
