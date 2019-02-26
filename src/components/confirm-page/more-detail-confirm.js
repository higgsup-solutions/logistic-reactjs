import React, {Component} from 'react'
import {FormattedMessage, injectIntl} from "react-intl";
import {Layout} from "element-react";


class MoreDetailConfirm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chargeInfo: props.chargeInfo,
        };
    }

    render() {
        return (
            <div>
                <h5 style={{'margin-left': '1.5em'}}><u>
                    <FormattedMessage id={'confirm.moreDetails'}/>:
                </u></h5>
                <Layout.Row className="more-detail">
                    <Layout.Col span="24">
                        <table className="shipment-detail-table table">
                            <tbody>
                            <tr>
                                <td className="title-block">
                                    <u><i><FormattedMessage id={'confirm.quoteDetails'}/></i></u>
                                </td>
                            </tr>
                            <tr>
                                <td className="title-block">
                                    <FormattedMessage id={'sd.baseCharge'}/>
                                </td>
                                <td>
                                    <div>{this.state.chargeInfo.baseCharge || '-'}</div>
                                </td>
                            </tr>
                            <tr>
                                <td className="title-block">
                                    <FormattedMessage id={'sd.fuelSurcharge'}/>
                                </td>
                                <td>
                                    <div>{this.state.chargeInfo.fuelSurcharge || '-'}</div>
                                </td>
                            </tr>
                            <tr>
                                <td className="title-block">
                                    <FormattedMessage id={'sd.totalCharge'}/>
                                </td>
                                <td>
                                    <div>{this.state.chargeInfo.totalCharge || '-'}</div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </Layout.Col>
                </Layout.Row>
            </div>
        )
    }
}

export default injectIntl(MoreDetailConfirm);
