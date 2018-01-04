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
import { userAction } from '../../_actions';

class Generator extends Component {

    onRatingClick(value) {
        this.props.onRatingClick(value);
    }

    onAddToFavoriteClick() {
        this.props.dispatch(userAction.addResultToFavorite(this.props.resultsOptions[this.props.currentIndex]));
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
                    <p/>
                    <ButtonGeneral
                        text={'Add to favorite'}
                        onClick={()=>this.onAddToFavoriteClick()}
                    />
                    {this.props.adding &&
                     <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
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
        adding: state.userAddToFavorite.adding,
    };
}

export default connect(mapStateToProps)(Generator);
