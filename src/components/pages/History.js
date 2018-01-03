import React, { Component } from 'react';
import { connect } from 'react-redux';
import Utils from '../../utils/Utils';
import Config from '../../Config';

class History extends Component {
    render() {
        return (
            <div>
                <h3 style={{color: Config.colors.theme}}>Image History</h3>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        disableWebgl: state.generatorConfig.webglDisabled,
        currentModel: state.generator.currentModel,
        options: state.generator.options,
        results: state.generator.results,
        //resultsOptions: state.generator.
    };
}

export default connect(mapStateToProps)(History);
