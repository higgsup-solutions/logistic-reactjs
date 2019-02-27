import React, {Component} from 'react'
import {FormattedMessage, injectIntl} from "react-intl";
import {Card, Tabs} from "element-react";
import UserSettings from "./user-settings";
import AddressDefaultSettings from "./address-default-settings";
import './settings.scss';

class Settings extends Component {

    render() {
        return (
            <div className="settings">
                <div className="row w-100 ml-0">
                    <div className="col-md-12">

                        <Card className="mycard settings-card"
                              header={
                                  <div className="clearfix"
                                       style={{paddingLeft: '1em'}}>
                                      <FormattedMessage id='settings.title'/>
                                  </div>
                              }>
                            <Tabs type="card" value="user-setting">
                                <Tabs.Pane
                                    name="user-setting"
                                    label={
                                        this.props.intl.formatMessage({id: 'settings.tab.userSettings'}).toUpperCase()
                                    }>
                                    <UserSettings/>
                                </Tabs.Pane>
                                <Tabs.Pane
                                    name="address-default"
                                    label={
                                        this.props.intl.formatMessage({id: 'settings.tab.addressDefault'}).toUpperCase()
                                    }>
                                    <div className="user-settings">
                                        <div className="row">
                                            <div className="col-md-6 col-sm-12">
                                                <AddressDefaultSettings
                                                    type="from"/>
                                            </div>
                                            <div className="col-md-6 col-sm-12">
                                                <AddressDefaultSettings
                                                    type="to"/>
                                            </div>
                                        </div>
                                    </div>
                                </Tabs.Pane>
                                <Tabs.Pane
                                    name="change-password"
                                    label={
                                        this.props.intl.formatMessage({id: 'settings.tab.changePassword'}).toUpperCase()
                                    }>
                                    User
                                </Tabs.Pane>
                                <Tabs.Pane
                                    name="dimensions"
                                    label={
                                        this.props.intl.formatMessage({id: 'settings.tab.dimensions'}).toUpperCase()
                                    }>
                                    User
                                </Tabs.Pane>
                            </Tabs>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }

}

export default injectIntl(Settings);
