import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Config from '../Config';
import './Navbar.css';

class Navbar extends Component {

    renderLink(title, path) {
        var currentLocation = this.props.location.pathname;
        return (
            <li className={currentLocation === path ? 'active': ''}><Link to={path}>{title}</Link></li>
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
                        <Link className="navbar-brand" to="/"><span style={{color: Config.colors.theme}}>MakeGirls.moe</span></Link>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            {this.renderLink('Home', '/')}
                            {this.renderLink('About', '/about')}
                            {this.renderLink('News', '/news')}
                            {this.renderLink('Tips', '/tips')}
                            <li><a href="https://makegirlsmoe.github.io/" target="_blank" rel="noopener noreferrer">Official Blog</a></li>
                            <li><a href="https://github.com/makegirlsmoe" target="_blank" rel="noopener noreferrer">Github</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
