import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Stat from './Stat';
import './App.css';

class App extends Component {
    render() {
        var pathname = this.props.location.pathname;
        return (
            <div className="App">
                <Navbar location={this.props.location}/>
                <div className="main-content">
                    {pathname !== '/stat' &&
                        <div hidden={pathname !== '/'}>
                            <Home />
                        </div>
                    }
                    <Switch>
                        <Route path="/about" component={About}/>
                        <Route path="/stat" component={Stat}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
