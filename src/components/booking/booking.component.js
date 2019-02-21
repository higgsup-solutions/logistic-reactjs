import React, {Component} from "react";
import './booking.scss';
import SenderAddress from "./sender-address";
import {Button, Layout} from 'element-react';
import {FormattedMessage, injectIntl} from "react-intl";
import PackageShipment from "./package-shipment";
import {Notification} from 'element-react';
import {REGEX_EMAIL} from "../../App.constant";
import {listCarrier, listDataCity, listDataSuggest} from "../../integrate/booking";

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            listCity: [],
            listCarrier: [],
            listPackageType: [],
            sender: {
                company: '',
                phoneNumber: '',
                contactName: '',
                emailAddress: '',
                country: {
                    label: "Viet Nam", value: 288
                },
                address1: '',
                address2: '',
                saveToAddressBook: false,
                cityId: null,
                cityName: '',
                postalCode: null,
                stateProvince: ''
            },
            recipient: {
                company: '',
                phoneNumber: '',
                contactName: '',
                emailAddress: '',
                country: {
                    label: "Viet Nam", value: 288
                },
                address1: '',
                address2: '',
                saveToAddressBook: false,
                cityId: null,
                cityName: '',
                postalCode: null,
                stateProvince: ''
            },
            package: {
                shippingDate: new Date(),
                carrierId: null,
                serviceType: '',
                packageType: null,
                contentType: 'Documents',
                documentInfos: [
                    {
                        weights: null,
                        type: null,
                        l: null,
                        w: null,
                        h: null,
                        quantity: null
                    }
                ],
                dangerousGoods: false
            },
            senderErrors: [],
            recipientErrors: [],
        }
    };

    componentWillMount() {
        listDataSuggest().then(res => {
            if(res.status == 'OK') {
                let newState = this.state;
                newState.listData = res.data;
                this.setState(newState);
            }
        });
        listDataCity().then(res => {
            let newState = this.state;
            if(!res.data) {
                newState.listCity = [];
            } else {
                newState.listCity = res.data;
            }
            this.setState(newState);
        });
        listCarrier().then(res => {
            let newState = this.state;
            newState.listCarrier = res.responseMessage.data;
            newState.package.carrierId = newState.listCarrier[0].id;
            newState.listPackageType = newState.listCarrier[0].packageDTO;
            newState.package.packageType = newState.listPackageType[0].id;
            this.setState(newState);
        });
    }

    onChangeFieldInput = (who) => (inputName, value) => {
        let newState = this.state;
        if (inputName == 'phone') {

        }
        if(inputName == 'country') {
            newState[who].cityName = '';
            newState[who].cityId = -1;
            newState[who].postalCode = '';
            newState[who].stateProvince = '';
        }
        newState[who][inputName] = value;
        this.setState(newState);
    };

    onContinueBooking = (e) => {
        let newState = this.state;
        newState.senderErrors.push('email');
        newState.recipientErrors.push('city');
        this.setState(newState);
        Notification.error({
            title: <h5 className="text-danger text-bold">Error</h5>,
            message: <div className="text-danger">
                <div>email invalid</div>
                <div>company is required</div>
            </div>,
        });
    };

    onSelectCity = (who) => (id) => {
        let newState = this.state;
        for(let i = 0 ; i < this.state.listCity.length; i++) {
            if(id == this.state.listCity[i].id) {
                newState[who].cityId = this.state.listCity[i].id;
                newState[who].cityName = this.state.listCity[i].cityName;
                newState[who].postalCode = this.state.listCity[i].postalCode;
                newState[who].stateProvince = this.state.listCity[i].stateProvince;
                break;
            }
        }
        this.setState(newState);
    };

    onSelectAuto = (who) => (id) => {
        let newState = this.state;
        for (let i = 0; i < this.state.listData.length; i++) {
            if (this.state.listData[i].id == id) {
                newState[who] = this.state.listData[i];
                newState[who].country = {
                    label: this.state.listData[i].countryName, value: this.state.listData[i].countryId
                };
                break;
            }
        }
        this.setState(newState);
    };

    onAddPiece = () => {
        let newState = this.state;
        newState.package.documentInfos.push({
            weights: null,
            type: null,
            l: null,
            w: null,
            h: null,
            quantity: null
        });
        this.setState(newState);
    };

    onDeleteRowDocument = (index) => {
        let newState = this.state;
        newState.package.documentInfos.splice(index,  1);
        this.setState(newState);
    };

    onQuote = (e) => {

    };

    render() {

        return (
            <div className="container-fluid booking">
                <div className="row w-100 ml-0">
                    <div className="col-sm-12 col-md-6 pr-1">
                        <SenderAddress data={this.state.listData}
                                       listCity = {this.state.listCity}
                                       form={this.state.sender}
                                       changeField={this.onChangeFieldInput('sender')}
                                       selectCity = {this.onSelectCity('sender')}
                                       selectContactName = {this.onSelectAuto('sender')}
                                       selectCompany = {this.onSelectAuto('sender')}
                                       fieldErrors={this.state.senderErrors}
                                       name={this.props.intl.formatMessage({id: 'booking.senderAddress'})}/>
                        <SenderAddress data={this.state.listData}
                                       listCity = {this.state.listCity}
                                       form={this.state.recipient}
                                       changeField={this.onChangeFieldInput('recipient')}
                                       selectCity = {this.onSelectCity('recipient')}
                                       selectContactName = {this.onSelectAuto('recipient')}
                                       selectCompany = {this.onSelectAuto('recipient')}
                                       fieldErrors={this.state.recipientErrors}
                                       name={this.props.intl.formatMessage({id: 'booking.recipientAddress'})}/>
                    </div>
                    <div className="col-sm-12 col-md-6 pl-1">
                        <PackageShipment form = {this.state.package}
                                         listCarrier = {this.state.listCarrier}
                                         listPackageType = {this.state.listPackageType}
                                         addPiece = {this.onAddPiece}
                                         deleteRowDocument = {this.onDeleteRowDocument}
                                         changeField = {this.onChangeFieldInput('package')}/>
                        <div className="text-right pr-3">
                            <Button type="primary" onClick={this.onQuote}><FormattedMessage
                                id='booking.quote'/></Button>
                            <Button type="primary" onClick={this.onContinueBooking}><FormattedMessage
                                id='booking.continueBooking'/></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectIntl(Booking);
