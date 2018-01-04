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
        console.log(this.props.results);
        console.log(this.props.resultsOptions);
        return (
            <div>
                <div className="flex flex-space-between">
                    <h3 style={{color: Config.colors.theme}}>
                        <FormattedMessage id="Generated Images"/>
                    </h3>
                    <ButtonPrimary className="title-button" text={<span><span className="glyphicon glyphicon glyphicon-menu-left btn-back-icon"/><span className="btn-back-text">Back</span></span>} onClick={() => window.location = '#/'}/>
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
