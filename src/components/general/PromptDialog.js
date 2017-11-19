import 'rc-dialog/assets/bootstrap.css';
import React, { Component } from 'react';
import Dialog from 'rc-dialog';
import ButtonPrimary from '../generator-widgets/ButtonPrimary';
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

    onYesClick() {
        this.clearState();
        this.resolve();
    }

    onNoClick() {
        this.clearState();
        this.reject();
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
                    (this.props.type === 'alert' && [
                        <ButtonPrimary
                            key="OK"
                            text="OK"
                            onClick={() => this.onYesClick()} />
                    ]) || [
                        <button
                            type="button"
                            className="btn btn-default"
                            key="No"
                            onClick={() => this.onNoClick()}
                        >
                            No
                        </button>,
                        <ButtonPrimary
                            key="Yes"
                            text="Yes"
                            onClick={() => this.onYesClick()} />,
                    ]
                }
            >
                {this.state.message || this.props.message}
            </Dialog>
        );
    }
}

export default PromptDialog;