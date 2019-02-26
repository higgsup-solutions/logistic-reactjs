import React, {Component} from 'react'
import {FormattedMessage, injectIntl} from "react-intl";
import {Layout} from "element-react";


class AddressDetailConfirm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            who: props.who
        };
    }

    render() {
        return (
            <Layout.Row className="address-detail">
                <Layout.Col span="24">
                    <table className="shipment-detail-table table">
                        <tbody>
                        <tr>
                            <td className="title-block">
                                <u><i>
                                    <FormattedMessage
                                        id={`confirm.${this.state.who}.address`}/>
                                </i></u>
                            </td>
                            <td>
                                <div>
                                    {this.state.data.company + ' ' +
                                    this.state.data.contactName + ' ' +
                                    this.state.data.address1 + ' ' +
                                    this.state.data.address2 + ' ' +
                                    this.state.data.postalCode + ' ' +
                                    this.state.data.country.label + ' ' +
                                    this.state.data.cityName}
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </Layout.Col>
            </Layout.Row>
        )
    }
}

export default injectIntl(AddressDetailConfirm);
