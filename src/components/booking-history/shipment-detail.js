import React, {Component} from "react";
import {FormattedMessage, injectIntl} from "react-intl";
import {Dialog, Button, Layout} from "element-react";
import dateUtil from "../../utils/datetime";

class ShipmentDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dialogVisible: false,
            shipmentDetail: {},
            bookingDetailData: [],
            packageInfoData: [],
            addressData: [],
            quoteDetailData: []
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {data, isClickItem} = nextProps;
        if (isClickItem && data) {
            this.collectDataFromSelectedItem(data)
        } else {
            this.setState({
                dialogVisible: false
            })
        }
    }

    collectDataFromSelectedItem(data) {
        const packageInfoData = [
            {
                piece: data.pieces,
                actualWeight: data.actualWeight,
                cubicWeight: data.cubicWeight,
                dimension: {
                    length: data.dimentionLength,
                    weight: data.dimentionWeight,
                    height: data.dimentionHeight
                }
            }
        ];
        const addressData = [
            {
                shipperAddress: data.senderContactName,
                receiverAddress: data.recipientContactName
            },
            {
                shipperAddress: data.senderCompany,
                receiverAddress: data.recipientCompany
            },
            {
                shipperAddress: data.senderAddress1,
                receiverAddress: data.recipientAddress1
            },
            {
                shipperAddress: data.senderAddress2,
                receiverAddress: data.recipientAddress2
            },
            {
                shipperAddress: data.senderCountryName,
                receiverAddress: data.recipientCountryName
            },
            {
                shipperAddress: data.senderPhoneNumber,
                receiverAddress: data.recipientPhoneNumber
            }
        ];
        const quoteDetailData = [
            {
                key: 'baseCharge',
                value: data.baseCharge
            },
            {
                key: 'fuelSurcharge',
                value: data.fuelSurcharge
            },
            {
                key: 'gst',
                value: data.gst
            },
            {
                key: 'totalCharge',
                value: data.totalCharge
            }
        ];
        this.setState({
            dialogVisible: true,
            shipmentDetail: data,
            packageInfoData,
            addressData,
            quoteDetailData
        })
    }

    onDialogDismiss() {
        this.props.onCloseShipmentDetails()
    }

    render() {
        return (
            <div className="text-left shipment-detail-container">
                <Dialog
                    title={this.props.intl.formatMessage({id: 'sd.shipmentDetail'})}
                    size="small"
                    visible={this.state.dialogVisible}
                    onCancel={this.onDialogDismiss.bind(this)}
                    lockScroll={false}>
                    <Dialog.Body>
                        <Layout.Row className="shipment-detail">
                            <Layout.Col span="24">
                                <table className="shipment-detail-table table">
                                    <tbody>
                                        <tr>
                                            <td className="title-block">
                                                <b><FormattedMessage id={'sd.serviceType'}/></b>
                                            </td>
                                            <td>{this.state.shipmentDetail.serviceType || '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="title-block">
                                                <b><FormattedMessage id={'sd.shipmentDate'}/></b>
                                            </td>
                                            <td>{this.state.shipmentDetail.shippingDate ?
                                                dateUtil.dateFormat.ddmmyyyyMinus(this.state.shipmentDetail.shippingDate) :
                                                '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="title-block">
                                                <b><FormattedMessage id={'sd.packageType'}/></b>
                                            </td>
                                            <td>{this.state.shipmentDetail.packageType || '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="title-block">
                                                <b><FormattedMessage id={'sd.tracking'}/></b>
                                            </td>
                                            <td>{this.state.shipmentDetail.trackingNo || '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="title-block">
                                                <b><FormattedMessage id={'sd.contentType'}/></b>
                                            </td>
                                            <td>{this.state.shipmentDetail.contentType || '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="title-block">
                                                <b><FormattedMessage id={'sd.actualWeight'}/></b>
                                            </td>
                                            <td>{this.state.shipmentDetail.actualWeight || '-'} kg(s)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Layout.Col>
                        </Layout.Row>
                        <Layout.Row className="package-info">
                            <Layout.Col span="24">
                                <div className="package-info-header">
                                    <u><FormattedMessage id='sd.packageInfo'/></u>
                                </div>
                                <table className="package-info-table table">
                                    <thead>
                                        <tr>
                                            <th>{this.props.intl.formatMessage({id: 'sd.piece'}).toUpperCase()}</th>
                                            <th>{this.props.intl.formatMessage({id: 'sd.actualWeight'}).toUpperCase()}</th>
                                            <th>{this.props.intl.formatMessage({id: 'sd.cubicWeight'}).toUpperCase()}</th>
                                            <th>{this.props.intl.formatMessage({id: 'sd.dimension'}).toUpperCase()}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.packageInfoData.map((packageInfo, i) => {
                                            return (
                                                <tr>
                                                    <td>{packageInfo.piece || '-'}</td>
                                                    <td>{packageInfo.actualWeight || '-'} kg(s)</td>
                                                    <td>{packageInfo.cubicWeight || '-'} kg(s)</td>
                                                    <td>
                                                        {packageInfo.dimension.length  || '-'} x&nbsp;
                                                        {packageInfo.dimension.weight  || '-'} x&nbsp;
                                                        {packageInfo.dimension.height  || '-'} cm(s)
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                    </tbody>
                                </table>
                                <div className="text-right">
                                    <Button type="primary">
                                        <FormattedMessage id='view'/>
                                    </Button>
                                    <Button type="primary">
                                        <FormattedMessage id='track'/>
                                    </Button>
                                </div>
                            </Layout.Col>
                        </Layout.Row>
                        <Layout.Row className="package-info-extend">
                            <Layout.Col span="24">
                                <table className="address-table table table-hover">
                                    <thead>
                                        <tr>
                                            <th>{this.props.intl.formatMessage({id: 'sd.shipperAddress'}).toUpperCase()}</th>
                                            <th>{this.props.intl.formatMessage({id: 'sd.receiverAddress'}).toUpperCase()}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.addressData.map((address, i) => {
                                            return (
                                                <tr>
                                                    <td>{address.shipperAddress || '-'}</td>
                                                    <td>{address.receiverAddress || '-'}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                    </tbody>
                                </table>
                                <table className="quote-detail-table table table-hover">
                                    <thead>
                                    <tr>
                                        <th colSpan='2'>{this.props.intl.formatMessage({id: 'sd.quoteDetail'}).toUpperCase()}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.quoteDetailData.map((quoteDetailItem, i) => {
                                            return (
                                                <tr>
                                                    <td>- <FormattedMessage id={`sd.${quoteDetailItem.key}`}/>:</td>
                                                    <td>{quoteDetailItem.value || '-'}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                    </tbody>
                                </table>
                                <div className="quote-detail-alert">
                                    <i><FormattedMessage id='sd.quoteDetail.alert'/></i>
                                </div>
                            </Layout.Col>
                        </Layout.Row>
                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={this.onDialogDismiss.bind(this)}
                                type="primary">
                            <FormattedMessage id='close'/>
                        </Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        )
    }

}

export default injectIntl(ShipmentDetail);
