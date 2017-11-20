import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import Config from '../Config';
import './Navbar.css';
import Dropdown, {DropdownContent, DropdownTrigger} from 'react-simple-dropdown';
import {localeAction } from '../_actions';

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    renderLink(title, path) {
        var currentLocation = this.props.location.pathname;
        return (
            <li className={currentLocation === path ? 'active': ''}><Link to={path}>
                <FormattedMessage
                    id={title}
                /></Link>
            </li>
        );
    }

    renderLanguageDropdown() {
        return (
            <Dropdown className="language-dropdown">
                <DropdownTrigger>
                    <span className="language-dropdown__name">
                        <FormattedMessage id="CurrentLanguage"/>
                    </span>
                </DropdownTrigger>
                <DropdownContent>
                    <ul className="language-dropdown__segment language-dropdown__quick-links">
                        <li className="language-dropdown__link"><a href="#" onClick={()=>{this.props.dispatch(localeAction.changeLocale('en'));}}>English</a></li>
                        <li className="language-dropdown__link"><a href="#" onClick={()=>{this.props.dispatch(localeAction.changeLocale('ja'));}}>日本語</a></li>
                        <li className="language-dropdown__link"><a href="#" onClick={()=>{this.props.dispatch(localeAction.changeLocale('zh'));}}>中文</a></li>
                        <li className="language-dropdown__link"><a href="#" onClick={()=>{this.props.dispatch(localeAction.changeLocale('ru'));}}>Русский</a></li>
                    </ul>
                </DropdownContent>
            </Dropdown>
        );
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                        </button>
                        <Link className="navbar-brand" to="/"><span style={{color: Config.colors.theme}}>MakeGirlsMoe</span></Link>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            {this.renderLink('Home', '/')}
                            {this.renderLink('About', '/about')}
                            {this.renderLink('News', '/news')}
                            {this.renderLink('Tips', '/tips')}
                            {this.renderLink('Test', '/test')}
                            <li><a href="https://makegirlsmoe.github.io/" target="_blank" rel="noopener noreferrer">Official Blog</a></li>
                            <li><a href="https://github.com/makegirlsmoe" target="_blank" rel="noopener noreferrer">Github</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                {this.renderLanguageDropdown()}
                            </li>
                            <li>
                                <a className="twitter-share-button"
                                    href={"https://twitter.com/intent/tweet?"
                                    + "text=" + encodeURIComponent(Config.twitter.defaultText.substring(0, Config.twitter.defaultText.indexOf('http')))
                                    + "&url=" + encodeURIComponent(Config.twitter.defaultText.substring(Config.twitter.defaultText.indexOf('http')))}>
                                    Tweet
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

const connectedNavbar = connect()(Navbar);


export  { connectedNavbar as Navbar };
