import 'rc-dialog/assets/bootstrap.css';
import React, { Component } from 'react';
import Dialog from 'rc-dialog';
import ResultGallery from '../generator-widgets/ResultGallery';
import './PromptDialog.css';

class PromptDialog extends Component {

    constructor() {
        super();
        this.state = {
            visible: false,
            title: null,
            message: null
        };
    }

    show(title, message) {
        return new Promise((resolve, reject) => {
            this.setState({visible: true, title: title, message: message});
            this.resolve = resolve;
            this.reject = reject;
        });
    }

    clearState() {
        this.setState({
            visible: false,
            title: null,
            message: null
        });
    }

    onImageClick(result, options, index) {
        this.clearState();
        this.resolve([result, options, index]);
    }

    onCloseClick() {
        this.clearState();
        this.resolve();
    }

    render() {
        return (
            <Dialog
                className="dialog-prompt"
                visible={this.state.visible}
                animation="slide-fade"
                maskAnimation="fade"
                title={<h3 style={{margin: 0}}>{this.state.title || this.props.title}</h3>}
                footer={
                    <button
                         type="button"
                         className="btn btn-default"
                         onClick={() => this.onCloseClick()}>
                        Close
                    </button>
                }
            >
                {this.state.message || this.props.message}
                <div>
                    <ResultGallery results={this.props.results} resultsOptions={this.props.resultsOptions}
                         actions={[
                             {name: "Select", onClick: (result, options, index) => this.onImageClick(result, options, index)}
                         ]}/>
                </div>
            </Dialog>

        );
    }
}

export default PromptDialog;