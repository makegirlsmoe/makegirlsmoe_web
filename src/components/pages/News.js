import React, { Component } from 'react';
import Config from '../../Config';

class News extends Component {
    render() {
        return (
            <div className="news">
                <h3 style={{color: Config.colors.theme}}>Recent News</h3>

                <p>
                    2017-08-17: We posted a blog to show <a href="https://makegirlsmoe.github.io/main/2017/08/16/hack-noise.html" target="_blank" rel="noopener noreferrer">how to hack the noise</a>.
                </p>

                <p>
                  2017-08-14: We made <a href="https://makegirlsmoe.github.io/main/2017/08/14/news-english.html" target="_blank" rel="noopener noreferrer">a post in English</a> explain our work
                  in our <a href="https://makegirlsmoe.github.io/" target="_blank" rel="noopener noreferrer">official blog</a>.
                </p>

            </div>
        );
    }
}

export default News;
