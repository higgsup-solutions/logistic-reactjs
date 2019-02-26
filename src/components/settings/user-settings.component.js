import React, {Component} from 'react'
import {FormattedMessage, injectIntl} from "react-intl";
import {Button, Card, Input} from "element-react";

class UserSettings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 5,
            email: '',
            firstName: '',
            lastName: '',
            country: '',
            city: '',
            language: '',
            address: ''
        }
    }

    onChangeInput = (fieldName) => (e) => {
        let newState = {...this.state};
        newState[fieldName] = e;
        this.setState(newState);
    };

    componentWillMount() {
        // call api
    }

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
                                        value={this.state.firstName}
                                        onChange={this.onChangeInput('firstName')}/>
                                </div>
                                <div className="col-md-6">
                                    <div className="label">
                                        <FormattedMessage id='settings.info.lastName'/>:
                                    </div>
                                    <Input
                                        value={this.state.lastName}
                                        onChange={this.onChangeInput('lastName')}/>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <div className="label">
                                        <FormattedMessage id='settings.info.phone'/>:
                                    </div>
                                    <Input
                                        value={this.state.phone}
                                        onChange={this.onChangeInput('phone')}/>
                                </div>
                                <div className="col-md-6">
                                    <div className="label">
                                        <FormattedMessage id='settings.info.email'/>:
                                    </div>
                                    <Input
                                        value={this.state.email}
                                        onChange={this.onChangeInput('email')}/>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <div className="label">
                                        <FormattedMessage id='settings.info.country'/>:
                                    </div>
                                    <Input
                                        value={this.state.country}
                                        onChange={this.onChangeInput('country')}/>
                                </div>
                                <div className="col-md-6">
                                    <div className="label">
                                        <FormattedMessage id='settings.info.city'/>:
                                    </div>
                                    <Input
                                        value={this.state.city}
                                        onChange={this.onChangeInput('city')}/>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-12">
                                    <div className="label">
                                        <FormattedMessage id='settings.info.address'/>:
                                    </div>
                                    <Input
                                        value={this.state.address}
                                        onChange={this.onChangeInput('address')}/>
                                </div>
                            </div>
                            <div className="text-right">
                                <Button type="primary">
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
