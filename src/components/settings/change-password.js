import React, {Component} from 'react'
import {FormattedMessage, injectIntl} from "react-intl";
import {Button, Card, Input, Notification} from "element-react";
import {changePassword} from "../../integrate/settings";

class ChangePassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            error: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            }
        }
    }

    onChangeInput = (fieldName) => (e) => {
        let newState = {...this.state};
        newState.form[fieldName] = e;
        this.setState(newState);
    };

    onFocusInput = (fieldName) => (e) => {
        let newState = {...this.state};
        newState.error[fieldName] = '';
        this.setState(newState);
    };

    onChangePassword() {
        if (this.isValidPassword()) {
            changePassword(this.state.form).then(res => {
                if (res.status === 'OK') {
                    Notification.success({
                        title: 'Success',
                        message: this.props.intl.formatMessage({id: 'settings.changePass.changePassSuccess'})
                    });
                    this.setState({
                        form: {
                            oldPassword: '',
                            newPassword: '',
                            confirmPassword: ''
                        }
                    })
                } else {
                    Notification.error({
                        title: 'Error',
                        message: res.messageString
                    });
                }
            })
        }
    }


    // return boolean
    isValidPassword = () => {
        const {oldPassword, newPassword, confirmPassword} = this.state.form;
        let result = true;

        const isRequiredTxt = this.props.intl.formatMessage({id: 'settings.changePass.error.isRequire'});
        const isNotMatchTxt = this.props.intl.formatMessage({id: 'settings.changePass.error.isNotMatch'});

        let newErrorState = this.state.error;

        if (!oldPassword) {
            newErrorState.oldPassword = this.props.intl.formatMessage({id: 'settings.changePass.oldPass'}) + isRequiredTxt;
            result = false;
        }
        if (!newPassword) {
            newErrorState.newPassword = this.props.intl.formatMessage({id: 'settings.changePass.newPass'}) + isRequiredTxt;
            result =  false;
        }
        if (!confirmPassword) {
            newErrorState.confirmPassword = this.props.intl.formatMessage({id: 'settings.changePass.confirmPass'}) + isRequiredTxt;
            result =  false;
        }

        if (confirmPassword !== newPassword) {
            newErrorState.confirmPassword = this.props.intl.formatMessage({id: 'settings.changePass.confirmPass'}) +
                isNotMatchTxt +
                this.props.intl.formatMessage({id: 'settings.changePass.newPass'});
            result =  false;
        }

        this.setState({
            error: newErrorState
        });

        return result
    };

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
                            <div className="note-content mb-3">
                                <div><FormattedMessage id='settings.changePass.note'/>:</div>
                                <div><FormattedMessage id='settings.changePass.noteDes'/></div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-12">
                                    <div className="label">
                                        <FormattedMessage id='settings.changePass.oldPass'/>
                                        <span className="required">*</span>
                                    </div>
                                    <Input
                                        type="password"
                                        value={this.state.form.oldPassword}
                                        onFocus={this.onFocusInput('oldPassword')}
                                        onChange={this.onChangeInput('oldPassword')}/>
                                    <div className="error-message">
                                        {this.state.error.oldPassword ? this.state.error.oldPassword : null}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="label">
                                        <FormattedMessage id='settings.changePass.newPass'/>
                                        <span className="required">*</span>
                                    </div>
                                    <Input
                                        type="password"
                                        value={this.state.form.newPassword}
                                        onFocus={this.onFocusInput('newPassword')}
                                        onChange={this.onChangeInput('newPassword')}/>
                                    <div className="error-message">
                                        {this.state.error.newPassword ? this.state.error.newPassword : null}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="label">
                                        <FormattedMessage id='settings.changePass.confirmPass'/>
                                        <span className="required">*</span>
                                    </div>
                                    <Input
                                        type="password"
                                        value={this.state.form.confirmPassword}
                                        onFocus={this.onFocusInput('confirmPassword')}
                                        onChange={this.onChangeInput('confirmPassword')}/>
                                    <div className="error-message">
                                        {this.state.error.confirmPassword ? this.state.error.confirmPassword : null}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <Button
                                    type="primary"
                                    onClick={this.onChangePassword.bind(this)}>
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
