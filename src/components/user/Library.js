import React, { Component } from 'react';
import { FormattedMessage } from "react-intl";
import { connect } from 'react-redux';
import { userAction } from '../../_actions';
import ResultGallery from '../generator-widgets/ResultGallery';
import { generatorAction } from '../../_actions';
import ButtonPrimary from '../generator-widgets/ButtonPrimary';
import Config from '../../Config';

class Library extends Component {

    async componentDidMount() {
        //console.log('mount');
        //console.log(this.props.results);
        this.props.dispatch(userAction.queryLibrary());
    }

    loadImage(index) {
        this.props.dispatch(generatorAction.appendResult(this.props.results[index], this.props.resultsOptions[index], true));
    }

    loadOptions(index) {
        this.props.dispatch(generatorAction.changeGeneratorModel(this.props.resultsOptions[index].modelName));
        this.props.dispatch(generatorAction.setGeneratorOptions(this.props.resultsOptions[index]));
        this.props.dispatch(generatorAction.fixGeneratorOptions());
        this.loadImage(index);
        window.location = '#/';
    }

    render(){
        console.log(this.props.loading);
        //console.log(this.props.resultsOptions);
        return (
            <div>
                <div className="flex flex-space-between">
                    <h3 style={{color: Config.colors.theme}}>
                        <FormattedMessage id="Library"/>
                        {this.props.loading &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </h3>
                    <ButtonPrimary className="title-button" text={<span><span className="glyphicon glyphicon glyphicon-refresh btn-back-icon"/><span className="btn-back-text">Refresh</span></span>} onClick={() => this.props.dispatch(userAction.queryLibrary())}/>
                </div>
                <ResultGallery results={this.props.results} resultsOptions={this.props.resultsOptions}
                               onClick={(result, options, index) => this.loadImage(index)}
                               actions={[
                                   {name: "Load Options", onClick: (result, options, index) => this.loadOptions(index)}
                               ]}/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.authentication.user.user,
        loading: state.userLibrary.querying,
        results: state.userLibrary.results,
        resultsOptions: state.userLibrary.resultsOptions,
    };
}

export default connect(mapStateToProps)(Library);
