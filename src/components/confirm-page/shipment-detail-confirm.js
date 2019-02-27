import React, {Component} from 'react'
import {FormattedMessage, injectIntl} from "react-intl";
import {Layout} from "element-react";


class ShipmentDetailConfirm extends Component {

    serviceTypeList = [
        'Express',
        'Economy Express',
        'DHL Worldwide Express',
        'Expedited',
        'Express Saver'
    ];

    constructor(props) {
        super(props);

        this.state = {
            chargeInfo: props.chargeInfo,
            package: props.package,
        };
    }

    render() {
        return (
            <Layout.Row className="shipment-detail">
                <Layout.Col span="24">
                    <table className="shipment-detail-table table">
                        <tbody>
                        <tr>
                            <td className="title-block">
                                <FormattedMessage id={'confirm.carrierName'}/>
                            </td>
                            <td>{this.state.package.carrierType || '-'}</td>
                        </tr>
                        <tr>
                            <td className="title-block">
                                <FormattedMessage id={'sd.serviceType'}/>
                            </td>
                            <td>{this.serviceTypeList[this.state.package.serviceType] || '-'}</td>
                        </tr>
                        <tr>
                            <td className="title-block">
                                <FormattedMessage id={'sd.packageType'}/>
                            </td>
                            <td>{this.state.package.packageTypeName || '-'}</td>
                        </tr>
                        <tr>
                            <td className="title-block">
                                <FormattedMessage id={'confirm.weight'}/>
                            </td>
                            <td>{this.state.chargeInfo.totalWeight || '-'} kg(s)</td>
                        </tr>
                        </tbody>
                    </table>
                </Layout.Col>
            </Layout.Row>
        )
    }
}

export default injectIntl(ShipmentDetailConfirm);
