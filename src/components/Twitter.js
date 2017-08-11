import React, { Component } from 'react';
import Config from '../Config';
import ButtonPrimary from './ButtonPrimary';
import TwitterUtils from '../utils/Twitter';
import Stat from '../utils/Stat';

class Twitter extends Component {
    constructor() {
        super();
        this.state = {
            image: localStorage['twitter_image'],
            text: Config.twitter.defaultText,
            state: 'normal',
            timeRemaining: 5
        };
    }

    share() {
        TwitterUtils.submit(this.state.text, this.state.image).then(response => {
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
        });
    }

    back() {
        window.close();
    }

    render() {
        return (
            <div className="twitter">

                <h3 style={{color: Config.colors.theme}}>Share on Twitter</h3>

                {this.state.state === 'normal' &&
                <div className="row">
                    <div className="col-xs-12 col-sm-2">
                        <img src={this.state.image} alt="share_image" />
                    </div>
                    <div className="col-xs-12 col-sm-10">
                        <textarea className="form-control" style={{height: 128}} value={this.state.text} onChange={event => this.setState({text: event.target.value})} />
                    </div>
                </div>
                }

                {this.state.state === 'successful' &&
                <div className="alert alert-success" role="alert">
                    <span className="glyphicon glyphicon-ok-sign" style={{marginRight: 5}} />
                    <span className="sr-only">Success:</span>
                    Your tweet was posted. You will be redirected to main page in {this.state.timeRemaining} seconds.
                </div>
                }

                {this.state.state === 'failed' &&
                <div className="alert alert-danger" role="alert">
                    <span className="glyphicon glyphicon-exclamation-sign" style={{marginRight: 5}} />
                    <span className="sr-only">Error:</span>
                    An error occurred. Please <a href={TwitterUtils.getAuthUrl()}>try again</a> later.
                </div>
                }


                <div className="row" style={{marginTop: 20}}>
                    <div className="col-xs-12 text-right">
                        {this.state.state === 'normal' && <ButtonPrimary onClick={() => this.share()} text="Submit"/> }
                        {(this.state.state === 'successful' || this.state.state === 'failed') && <ButtonPrimary onClick={() => this.back()} text="Return to main page" /> }
                    </div>
                </div>

            </div>
        );
    }
}

export default Twitter;
