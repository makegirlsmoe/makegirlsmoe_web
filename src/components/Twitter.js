import React, { Component } from 'react';
import Config from '../Config';
import ButtonPrimary from './ButtonPrimary';
import TwitterUtils from '../utils/Twitter';

class Twitter extends Component {
    constructor() {
        super();
        this.state = {
            image: localStorage['twitter_image'],
            text: Config.twitter.defaultText
        };
    }

    share() {
        TwitterUtils.submit(this.state.text, this.state.image).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="twitter">

                <h3 style={{color: Config.colors.theme}}>Share on Twitter</h3>
                <div className="row">
                    <div className="col-xs-12 col-sm-2">
                        <img src={this.state.image} alt="share_image" />
                    </div>
                    <div className="col-xs-12 col-sm-10">
                        <textarea className="form-control" style={{height: 128}} value={this.state.text} onChange={event => this.setState({text: event.target.value})} />
                    </div>
                </div>
                <div className="row" style={{marginTop: 20}}>
                    <div className="col-xs-12 text-right">
                        <ButtonPrimary onClick={() => this.share()} text="Submit" />
                    </div>
                </div>

            </div>
        );
    }
}

export default Twitter;
