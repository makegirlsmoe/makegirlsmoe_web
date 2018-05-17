import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { HashRouter, Route } from 'react-router-dom';
import 'jquery/src/jquery';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './fonts/fonts.css'
import './index.css';
import Config from './Config';
import {App} from './App/App';
// import registerServiceWorker from './registerServiceWorker';
import { store } from './_helpers/store';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-119424712-01', {debug: Config.debug});
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Route path="/" component={App} />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
// registerServiceWorker();
