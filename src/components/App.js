import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar location={this.props.location}/>
                <div className="main-content">
                    <div hidden={this.props.location.pathname !== '/'}>
                        <Home />
                    </div>
                    <Switch>
                        <Route path="/about" component={About}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
