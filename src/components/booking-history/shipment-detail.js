import React, {Component} from "react";
import {FormattedMessage, injectIntl} from "react-intl";
import {Dialog, Button, Table, Layout} from "element-react";

class ShipmentDetail extends Component {

    bookingDetailColumns = [
        {
            label: "",
            prop: "field",
        }, {
            label: "",
            prop: "value",
        }
    ];

    bookingDetailData = [
        {
            field: 'Service Type',
            value: 'DHL Domestic'
        }, {
            field: 'Shipment Date',
            value: '12-11-2018'
        }, {
            field: 'Package Type',
            value: 'DHL Domestic Express'
        }
    ];

    packageInfoColumns = [
        {
            label: this.props.intl.formatMessage({id: 'sd.piece'}).toUpperCase(),
            prop: "piece"
        }, {
            label: this.props.intl.formatMessage({id: 'sd.actualWeight'}).toUpperCase(),
            prop: "actualWeight",
        }, {
            label: this.props.intl.formatMessage({id: 'sd.cubicWeight'}).toUpperCase(),
            prop: "cubicWeight",
        }, {
            label: this.props.intl.formatMessage({id: 'sd.dimension'}).toUpperCase(),
            prop: "dimension",
        }
    ];

    packageInfoData = [
        {
            piece: '1',
            actualWeight: '1.0 kg(s)',
            cubicWeight: '0.0 kg(s)',
            dimension: '0 x 0 x 0 cm(s)'
        }
    ];

    addressColumns = [
        {
            label: this.props.intl.formatMessage({id: 'sd.shipperAddress'}).toUpperCase(),
            prop: "shipperAddress"
        }, {
            label: this.props.intl.formatMessage({id: 'sd.receiverAddress'}).toUpperCase(),
            prop: "receiverAddress",
        }
    ];

    addressData = [
        {
            shipperAddress: 'Tran Dang Ninh',
            receiverAddress: 'Nguyen Khanh Toan'
        }
    ];

    quoteDetailColumns = [
        {
            label: this.props.intl.formatMessage({id: 'sd.quoteDetail'}).toUpperCase(),
            prop: "quoteDetail"
        }, {
            label: '',
            prop: "value",
        }
    ];

    quoteDetailData = [
        {
            quoteDetail: 'Base Charge:',
            value: '9.67'
        }
    ];

    constructor(props) {
        super(props);

        this.state = {
            dialogVisible: false,
            shipmentDetail: {}
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {data, isClickItem} = nextProps;
        if (isClickItem && data) {
            this.setState({
                dialogVisible: true,
                shipmentDetail: data
            })
        } else {
            this.setState({
                dialogVisible: false
            })
        }
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
                                <Table showHeader={false}
                                    style={{width: '100%'}}
                                    columns={this.bookingDetailColumns}
                                    data={this.bookingDetailData}
                                />
                            </Layout.Col>
                        </Layout.Row>
                        <Layout.Row className="package-info">
                            <Layout.Col span="24">
                                <div className="package-info-header">
                                    <u>{'Package Information'}</u>
                                </div>
                                <Table className="package-info-table"
                                    style={{width: '100%'}}
                                       columns={this.packageInfoColumns}
                                       data={this.packageInfoData}
                                />
                                <div className="text-right">
                                    <Button type="primary">
                                        <FormattedMessage id='view'/>
                                    </Button>
                                    <Button type="primary">
                                        <FormattedMessage id='sd.quoteDetail.alert'/>
                                    </Button>
                                </div>
                            </Layout.Col>
                        </Layout.Row>
                        <Layout.Row className="package-info-extend">
                            <Layout.Col span="24">
                                <Table className="address-table"
                                       style={{width: '100%'}}
                                       columns={this.addressColumns}
                                       data={this.addressData}
                                />
                                <Table className="quote-detail-table"
                                       style={{width: '100%'}}
                                       columns={this.quoteDetailColumns}
                                       data={this.quoteDetailData}
                                />
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
