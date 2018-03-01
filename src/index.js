import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { HashRouter, Route } from 'react-router-dom';
import 'jquery/src/jquery';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './fonts/fonts.css'
import './index.css';
import {App} from './App/App';
// import registerServiceWorker from './registerServiceWorker';
import { store } from './_helpers/store';


ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Route path="/" component={App} />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
// registerServiceWorker();
