import React, {Component} from 'react'
import {FormattedMessage, injectIntl} from "react-intl";
import {Button, Card, Input} from "element-react";

class ChangePassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    }

    onChangeInput = (fieldName) => (e) => {
        let newState = {...this.state};
        newState[fieldName] = e;
        this.setState(newState);
    };

    changePassword() {
        if (this.isValidPassword) {
            // call api
        }
    }


    // return boolean
    isValidPassword = () => {
        const {oldPassword, newPassword, confirmPassword} = this.state;

        if (!oldPassword) return false;
        if (!newPassword) return false;
        if (!confirmPassword) return false;

        if (confirmPassword !== newPassword) return false;

        return true
    };

    componentWillMount() {
        // call api
    }

    render() {
        return (
            <div className="change-password-settings">
                <div className="row">
                    <div className="col-md-6">
                        <Card className="mycard confirm-card"
                              header={
                                  <div className="clearfix"
                                       style={{paddingLeft: '1em'}}>
                                      <FormattedMessage id='settings.changePass.title'/>
                                  </div>
                              }>
                            <div className="note-content  mb-4">
                                <div><FormattedMessage id='settings.changePass.note'/>:</div>
                                <div><FormattedMessage id='settings.changePass.noteDes'/></div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-12 mb-4">
                                    <div className="label">
                                        <FormattedMessage id='settings.changePass.oldPass'/>:
                                    </div>
                                    <Input
                                        value={this.state.oldPassword}
                                        onChange={this.onChangeInput('oldPass')}/>
                                </div>
                                <div className="col-md-12 mb-4">
                                    <div className="label">
                                        <FormattedMessage id='settings.changePass.newPass'/>:
                                    </div>
                                    <Input
                                        value={this.state.newPassword}
                                        onChange={this.onChangeInput('newPass')}/>
                                </div>
                                <div className="col-md-12">
                                    <div className="label">
                                        <FormattedMessage id='settings.changePass.confirmPass'/>:
                                    </div>
                                    <Input
                                        value={this.state.confirmPassword}
                                        onChange={this.onChangeInput('confirmPass')}/>
                                </div>
                            </div>
                            <div className="text-right">
                                <Button
                                    type="primary"
                                    onClick={this.changePassword.bind(this)}>
                                    <FormattedMessage id='save'/>
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>

            </div>
        )
    }

}

export default injectIntl(ChangePassword);
