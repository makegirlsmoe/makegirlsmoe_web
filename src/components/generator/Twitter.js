import React, { Component } from 'react';
import Config from '../../Config';
import ButtonPrimary from '../generator-widgets/ButtonPrimary';
import TwitterUtils from '../../utils/Twitter';
import Stat from '../../utils/Stat';
import './Twitter.css';

class Twitter extends Component {
    constructor() {
        super();
        this.state = {
            image: localStorage['twitter_image'],
            imageWidth: 0,
            noise: localStorage['twitter_noise'],
            text: Config.twitter.defaultText,
            includeNoise: false,
            state: 'normal',
            timeRemaining: 5,
            submitting: false
        };
    }

    share() {
        this.setState({submitting: true});
        TwitterUtils.submit(this.state.text, this.state.image, this.state.includeNoise ? this.state.noise : null).then(response => {
            this.setState({state: 'successful'});
            Stat.share();
            var intervalID = setInterval(() => {
                var newTimeRemaining = this.state.timeRemaining - 1;
                this.setState({timeRemaining: newTimeRemaining});
                if (newTimeRemaining === 0) {
                    this.back();
                    clearInterval(intervalID);
                }
            }, 1000);
        }).catch(err => {
            this.setState({state: 'failed'});
        }).then(() => {
            this.setState({submitting: false});
        });
    }

    back() {
        window.close();
    }

    getClassShareImageContainer() {
        if (this.state.imageWidth < 150) {
            return "col-xs-12 col-sm-2 share-image-container";
        }
        else {
            return "col-xs-12 col-sm-4 share-image-container";
        }
    }

    getClassShareTextContainer() {
        if (this.state.imageWidth < 150) {
            return "col-xs-12 col-sm-10 share-text-container";
        }
        else {
            return "col-xs-12 col-sm-8 share-text-container";
        }
    }

    render() {
        return (
            <div className="twitter">

                <h3 style={{color: Config.colors.theme}}>Share on Twitter</h3>

                {this.state.state === 'normal' &&
                    <div>
                        <div className="row">
                            <div className={this.getClassShareImageContainer()}>
                                <img className="share-image" src={this.state.image} alt="share_image" onLoad={event => this.setState({ imageWidth: event.target.offsetWidth })} />
                            </div>
                            <div className={this.getClassShareTextContainer()}>
                                <textarea className="form-control share-text" value={this.state.text} onChange={event => this.setState({text: event.target.value})} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-2 share-noise-container" style={{display: this.state.includeNoise ? 'block' : 'none'}}>
                                <img className="share-noise" src={this.state.noise} alt="share_noise" />
                            </div>
                            <div className="col-xs-12 col-sm-10 share-noise-option-container">
                                <input type="checkbox" className="" checked={this.state.includeNoise} onChange={event => this.setState({includeNoise: event.target.checked})} />
                                <span>Include Noise</span>
                            </div>
                        </div>
                    </div>
                }

                {this.state.state === 'successful' &&
                <div className="alert alert-success" role="alert">
                    <span className="glyphicon glyphicon-ok-sign" />
                    <span className="sr-only">Success:</span>
                    Your tweet was posted. You will be redirected to main page in {this.state.timeRemaining} seconds.
                </div>
                }

                {this.state.state === 'failed' &&
                <div className="alert alert-danger" role="alert">
                    <span className="glyphicon glyphicon-exclamation-sign" />
                    <span className="sr-only">Error:</span>
                    An error occurred. Please <a href={TwitterUtils.getAuthUrl()}>try again</a> later.
                </div>
                }


                <div className="row">
                    <div className="col-xs-12 text-right button-container">
                        {this.state.state === 'normal' && <ButtonPrimary className="button-submit" disabled={this.state.submitting} onClick={() => this.share()} text={this.state.submitting ? 'Submitting...' : 'Submit'}/> }
                        {(this.state.state === 'successful' || this.state.state === 'failed') && <ButtonPrimary onClick={() => this.back()} text="Return to main page" /> }
                    </div>
                </div>

            </div>
        );
    }
}

export default Twitter;
