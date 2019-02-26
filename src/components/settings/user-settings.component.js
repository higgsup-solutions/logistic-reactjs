import React, {Component} from 'react'
import {FormattedMessage, injectIntl} from "react-intl";
import {Card, Tabs} from "element-react";

class UserSettings extends Component {

    render() {
        return (
            <div className="user-settings">
                <div className="row w-100 ml-0">
                    <div className="col-md-12">
                        <h1>User Settings</h1>
                    </div>
                </div>
            </div>
        )
    }

}

export default injectIntl(UserSettings);
