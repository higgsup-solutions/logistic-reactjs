import React, {Component} from 'react'
import {FormattedMessage, injectIntl} from "react-intl";
import {Button, Card, Input, Notification} from "element-react";
import {getUserInfo, updateUserInfo} from "../../integrate/user";
import {processString} from "../../utils/string";
import {REGEX_EMAIL, REGEX_PHONE_NUMBER} from "../../App.constant";
import {processNumber} from "../../utils/number";

class UserSettings extends Component {

    constructor(props) {
        super(props);

        const info = {
            id: '',
            phone: '',
            email: '',
            firstName: '',
            lastName: '',
            country: '',
            city: '',
            language: '',
            address: ''
        };
        this.state = {
            oldInfo: {...info},
            form: {...info},
            isChanged: false
        }
    }

    onChangeInput = (fieldName) => (e) => {
        if (fieldName === 'phone' && processNumber.checkExistNotNumber(e)) {
            return;
        }

        let newState = {...this.state};
        newState.form[fieldName] = e;
        newState.isChanged = this.isUserInfoUpdated(newState);
        this.setState(newState);
    };

    isUserInfoUpdated(newState) {
        const {oldInfo, form} = newState;
        return JSON.stringify(oldInfo) !== JSON.stringify(form);
    }

    componentWillMount() {
        getUserInfo().then(res => {
            const info = res.data;
            if (!info.phone) info.phone = '';
            delete info.password;
            this.setState({
                oldInfo: {...info},
                form: {...info}
            })
        });
    }

    updateUserInfo() {
        if (!this.isValidData()) return;

        updateUserInfo(this.state.form).then(res => {
           if (res.status === 'OK') {
               Notification.info({
                   title: 'Success',
                   message: this.props.intl.formatMessage({id: 'settings.info.updateSuccess'})
               });

               const info = res.data;
               if (!info.phone) info.phone = '';
               delete info.password;
               this.setState({
                   oldInfo: {...info},
                   isChanged: false
               })
           } else {
               Notification.error({
                   title: 'Error',
                   message: res.messageString
               });
           }
        });
    }

    isValidData = () => {
        const {phone, email} = this.state.form;
        if (processString.checkNotExistCharPhone(phone)) {
            Notification.error({
                title: 'Error',
                message: 'Phone is invalid'
            });
            return false;
        }

        let patPhone = new RegExp(REGEX_PHONE_NUMBER);
        if (phone && !patPhone.test(phone)) {
            Notification.error({
                title: 'Error',
                message: 'Phone is invalid'
            });
            return false;
        }

        let patEmail = new RegExp(REGEX_EMAIL);
        if (!patEmail.test(email)) {
            Notification.error({
                title: 'Error',
                message: 'Email is invalid'
            });
            return false;
        }

        return true;
    };

    render() {
        return (
            <div className="user-settings">
                <div className="row">
                    <div className="col-md-6">
                        <Card className="mycard confirm-card"
                              header={
                                  <div className="clearfix"
                                       style={{paddingLeft: '1em'}}>
                                      <FormattedMessage id='settings.info.title'/>
                                  </div>
                              }>
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <div className="label">
                                        <FormattedMessage id='settings.info.firstName'/>:
                                    </div>
                                    <Input
                                        value={this.state.form.firstName}
                                        onChange={this.onChangeInput('firstName')}/>
                                </div>
                                <div className="col-md-6">
                                    <div className="label">
                                        <FormattedMessage id='settings.info.lastName'/>:
                                    </div>
                                    <Input
                                        value={this.state.form.lastName}
                                        onChange={this.onChangeInput('lastName')}/>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <div className="label">
                                        <FormattedMessage id='settings.info.phone'/>:
                                    </div>
                                    <Input
                                        value={this.state.form.phone}
                                        onChange={this.onChangeInput('phone')}/>
                                </div>
                                <div className="col-md-6">
                                    <div className="label">
                                        <FormattedMessage id='settings.info.email'/>:
                                    </div>
                                    <Input
                                        value={this.state.form.email}
                                        onChange={this.onChangeInput('email')}/>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <div className="label">
                                        <FormattedMessage id='settings.info.country'/>:
                                    </div>
                                    <Input
                                        value={this.state.form.country}
                                        onChange={this.onChangeInput('country')}/>
                                </div>
                                <div className="col-md-6">
                                    <div className="label">
                                        <FormattedMessage id='settings.info.city'/>:
                                    </div>
                                    <Input
                                        value={this.state.form.city}
                                        onChange={this.onChangeInput('city')}/>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-12">
                                    <div className="label">
                                        <FormattedMessage id='settings.info.address'/>:
                                    </div>
                                    <Input
                                        value={this.state.form.address}
                                        onChange={this.onChangeInput('address')}/>
                                </div>
                            </div>
                            <div className="text-right">
                                <Button
                                    type="primary"
                                    disabled={!this.state.isChanged}
                                    onClick={this.updateUserInfo.bind(this)}>
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

export default injectIntl(UserSettings);
