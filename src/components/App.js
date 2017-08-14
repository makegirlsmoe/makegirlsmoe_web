import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Stat from './Stat';
import Twitter from './Twitter';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar location={this.props.location}/>
                <div className="main-content">
                    <Switch>
                        <Route path="/(|about|news|tips)" component={Home}/>
                        <Route path="/twitter" component={Twitter}/>
                        <Route path="/stat" component={Stat}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
