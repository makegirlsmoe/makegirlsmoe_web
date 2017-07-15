import 'rc-dialog/assets/bootstrap.css';
import React, { Component } from 'react';
import Dialog from 'rc-dialog';
import ButtonPrimary from './ButtonPrimary';
import './PromptDialog.css';

class PromptDialog extends Component {

    constructor() {
        super();
        this.state = {
            visible: false
        };

    }

    show() {
        return new Promise((resolve, reject) => {
            this.setState({visible: true});
            this.resolve = resolve;
            this.reject = reject;
        });
    }

    onYesClick() {
        this.setState({visible: false});
        this.resolve();
    }

    onNoClick() {
        this.setState({visible: false});
        this.reject();
    }

    render() {
        return (
            <Dialog
                className="dialog-prompt"
                visible={this.state.visible}
                animation="slide-fade"
                maskAnimation="fade"
                title={<h3 style={{margin: 0}}>{this.props.title}</h3>}
                footer={
                    [
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
                <p>{this.props.message}</p>
            </Dialog>
        );
    }
}

export default PromptDialog;