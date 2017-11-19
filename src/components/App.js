import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { IntlProvider, addLocaleData } from "react-intl";
import Navbar from './Navbar';
import Home from './Home';
import Stat from './pages/Stat';
import Twitter from './generator/Twitter';
import './App.css';
import zh_CN from '../locale/zh_CN';
import en_US from '../locale/en_US';
import ja_JP from '../locale/ja_JP';
import ru_RU from '../locale/ru_RU';
import intl from 'intl';
import en from "react-intl/locale-data/en";
import zh from "react-intl/locale-data/zh";
import ja from "react-intl/locale-data/ja";
import ru from "react-intl/locale-data/ru";
addLocaleData([...en,...zh,...ja,...ru]);

class App extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            locale : this.chooseDefaultLocale(),
        };
        console.log(this.state.locale);
    }

    onTimelineLoad() {
        window.$('.main-content').css('max-width', 1200);
        window.$('.container-fluid').css('max-width', 1200);
    }

    chooseDefaultLocale(){
        switch(navigator.language.slice(0,2)){
            case 'en':
                return 'en';
            case 'zh':
                return 'zh';
            case 'ja':
                return 'ja';
            case 'ru':
                return 'ru';
            default:
                return 'en';
        }
    }

    getLocaleMessage(){
        switch(this.state.locale){
            case 'en':
                return en_US;
            case 'zh':
                return zh_CN;
            case 'ja':
                return ja_JP;
            case 'ru':
                return ru_RU;
            default:
                return en_US;
        }
    }

    handleLocaleChange(newLocale){
        this.setState({
            locale: newLocale,
        });

    }

    render() {
        return (
            <IntlProvider
                locale={this.state.locale}
                messages={this.getLocaleMessage()}
            >
                <div className="App">
                    <Navbar location={this.props.location} onLocaleChange={nl=>this.handleLocaleChange(nl)}/>
                    <div className="main-content">
                        <Switch>
                            <Route path="/(|about|news|tips)" render={() =>
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

export default App;
