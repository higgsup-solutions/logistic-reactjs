import React, {Component} from 'react';
import './confirm.scss';
import {Button, Card, Layout} from "element-react";
import {FormattedMessage, injectIntl} from "react-intl";
import {quote} from "../../integrate/booking";
import AddressDetailConfirm from "./address-detail-confirm";
import MoreDetailConfirm from "./more-detail-confirm";
import ShipmentDetailConfirm from "./shipment-detail-confirm";

class ConfirmComponent extends Component {
    constructor(props) {
        super(props);
        // console.log(JSON.stringify(this.props.location.state.data))

        this.state = {
            ...fakeData,
            quote: {
                total: '0.00'
            }
        };
    }

    componentWillMount() {
        // todo: quote
        // this.setState()
    }


    render() {
        return (
            <div className="confirm">
                <div className="row w-100 ml-0">
                    <div className="col-md-12">

                        <Card className="mycard confirm-card"
                              header={
                                  <div className="clearfix" style={{paddingLeft: '1em'}}>
                                      <FormattedMessage id='confirm.title'/>
                                  </div>
                              }>

                            <ShipmentDetailConfirm
                                chargeInfo={this.state.chargeInfo}
                                package={this.state.package}
                            />

                            <Layout.Row className="quote-detail">
                                <Layout.Col span="24">
                                    <table className="shipment-detail-table table">
                                        <tbody>
                                            <tr>
                                                <td className="title-block">
                                                    <FormattedMessage id={'booking.quote'}/>
                                                </td>
                                                <td>
                                                    <div>{this.state.quote.total || '-'}</div>
                                                    <div><i><u>
                                                        <FormattedMessage id={'sd.quoteDetail.alert'}/>
                                                    </u></i></div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Layout.Col>
                            </Layout.Row>

                            <MoreDetailConfirm
                                chargeInfo={this.state.chargeInfo}
                            />

                            <AddressDetailConfirm
                                data={this.state.recipient}
                                who={'sender'}
                            />

                            <AddressDetailConfirm
                                data={this.state.recipient}
                                who={'receiver'}
                            />

                            <div className="text-right action-block">
                                <Button type="primary">
                                    <FormattedMessage id='cancel'/>
                                </Button>
                                <Button type="primary">
                                    <FormattedMessage id='booking'/>
                                </Button>
                            </div>

                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default injectIntl(ConfirmComponent);


const fakeData = {
    "sender": {
        "company": "higgsup",
        "phoneNumber": "0123456789",
        "contactName": "tiepnm",
        "emailAddress": "quytest_1@gmail.com",
        "country": {"label": "Viet Nam", "value": 288},
        "address1": "Ha Noi",
        "address2": "TP Ho Chi Minh",
        "saveToAddressBook": false,
        "cityId": 13,
        "cityName": "An Giang",
        "postalCode": "880000",
        "stateProvince": null,
        "countryId": 288,
        "countryName": "Viet Nam"
    },
    "recipient": {
        "company": "higgsup",
        "phoneNumber": "0123456789",
        "contactName": "tiepnm",
        "emailAddress": "quytest_1@gmail.com",
        "country": {"label": "Viet Nam", "value": 288},
        "address1": "Ha Noi",
        "address2": "TP Ho Chi Minh",
        "saveToAddressBook": false,
        "cityId": 15,
        "cityName": "Bạc Liêu",
        "postalCode": "260000",
        "stateProvince": null,
        "countryId": 288,
        "countryName": "Viet Nam"
    },
    "package": {
        "shippingDate": "2019-02-25T07:26:05.068Z",
        "carrierId": 1,
        "serviceType": "1",
        "packageType": 1,
        "contentType": "Parcel",
        "documentInfos": [
            {
                "weights": "1",
                "l": "2",
                "w": "3",
                "h": "4",
                "quantity": "5"
            },
            {
                "weights": "6",
                "l": "7",
                "w": "8",
                "h": "9",
                "quantity": "10"
            }
        ],
        "dangerousGoods": false
    },
    "chargeInfo": {
        "baseCharge": 62,
        "fuelSurcharge": 213,
        "dangerousCharge": 0,
        "totalCharge": 62,
        "totalWeight": 65,
        "weightType": "Actual"
    }
}
