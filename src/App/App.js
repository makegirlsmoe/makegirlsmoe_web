import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { IntlProvider, addLocaleData } from "react-intl";
import {Navbar} from '../components/Navbar';
import Home from '../components/Home';
import Stat from '../components/pages/Stat';
import Twitter from '../components/generator/Twitter';
import './App.css';

import en from "react-intl/locale-data/en";
import zh from "react-intl/locale-data/zh";
import ja from "react-intl/locale-data/ja";
import ru from "react-intl/locale-data/ru";

addLocaleData([...en,...zh,...ja,...ru]);

class App extends Component {
    constructor(props) {
        super(props);
    }

     onTimelineLoad() {
        window.$('.main-content').css('max-width', 1200);
        window.$('.container-fluid').css('max-width', 1200);
    }

    render() {
        return (
            <IntlProvider
                locale={this.props.locale}
                messages={this.props.localeMessage}
            >
                <div className="App">
                    <Navbar location={this.props.location} />
                    <div className="main-content">
                        <Switch>
                            <Route path="/(|about|news|tips|test)" render={() =>
                                <Home onTimelineLoad={() => this.onTimelineLoad()} />
                            }/>
                            <Route path="/twitter" component={Twitter}/>
                            <Route path="/stat" component={Stat}/>
                        </Switch>
                    </div>
                </div>
            </IntlProvider>
        );
    }
}

function mapStateToProps(state) {
    const { locale, localeMessage } = state.selectLocale;
    return {
        locale: locale,
        localeMessage: localeMessage
    };
}

const connectedApp = connect(
    mapStateToProps
)(App);

export { connectedApp as App };
