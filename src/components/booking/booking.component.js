import React, {Component} from "react";
import './booking.scss';
import SenderAddress from "./sender-address";
import {Button, Layout} from 'element-react';
import {FormattedMessage, injectIntl} from "react-intl";
import PackageShipment from "./package-shipment";
import {Notification} from 'element-react';
import {REGEX_EMAIL} from "../../App.constant";

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [
                {
                    id: 1,
                    countryId: 1,
                    cityId: 1,
                    userType: 'S',
                    company: 'higgsup',
                    contactName: 'tiepnm',
                    senderDefault: true,
                    recipientDefault: true,
                    phone: '0942426999',
                    emailAddress: 'cuongleanh91@gmail.com',
                    address1: '72 tran dang ninh',
                    address2: '',
                    cityName: 'hanoi',
                    countryName: 'Viet Nam',
                    postalCode: '100000',
                    stateProvince: null
                },
                {
                    id: 2,
                    countryId: 2,
                    cityId: 1,
                    userType: 'S',
                    company: 'bo tai chinh',
                    contactName: 'tiepnm',
                    senderDefault: false,
                    recipientDefault: false,
                    phone: '0942426999',
                    emailAddress: 'cuongleanh91@gmail.com',
                    address1: '47 pham van dong',
                    address2: '',
                    cityName: 'hanoi',
                    countryName: 'Ha Lan',
                    postalCode: '200000',
                    stateProvince: null
                },
                {
                    id: 3,
                    countryId: 3,
                    cityId: 1,
                    userType: 'S',
                    company: 'vietlot',
                    contactName: 'hungnh',
                    senderDefault: false,
                    recipientDefault: false,
                    phone: '0942426999',
                    emailAddress: 'cuongleanh91@gmail.com',
                    address1: '13 hai ba trung',
                    address2: '',
                    cityName: 'hanoi',
                    countryName: 'Dan Mach',
                    postalCode: '100022',
                    stateProvince: null
                }
            ],
            listCity: [
                {id: 1, cityName: 'Ha Noi', postalCode: '100000', stateProvince: null},
                {id: 2, cityName: 'Ha Nam', postalCode: '200000', stateProvince: null},
                {id: 3, cityName: 'Ha Tay', postalCode: '300000', stateProvince: null},
                {id: 4, cityName: 'Ha Dong', postalCode: '400000', stateProvince: null},
            ],
            sender: {
                company: '',
                phone: '',
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
                phone: '',
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
            senderErrors: [],
            recipientErrors: [],
            da: ''
        }
    };

    componentWillMount() {

    }

    onChangeFieldInput = (name) => (inputName, value) => {
        let newState = this.state;
        if (inputName == 'phone') {

        }
        if(inputName == 'country') {
            newState[name].cityName = '';
            newState[name].cityId = -1;
            newState[name].postalCode = '';
            newState[name].stateProvince = '';
        }
        newState[name][inputName] = value;
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

    onQuote = (e) => {
        let newState = this.state;
        newState.sender.company = 'le anh cuong';
        this.setState(newState);
    };

    render() {

        return (
            <div className="booking">
                <Layout.Row>
                    <Layout.Col span="12">
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
                    </Layout.Col>
                    <Layout.Col span="12">
                        <PackageShipment/>
                        <div className="text-right pr-3">
                            <Button type="primary" onClick={this.onQuote}><FormattedMessage
                                id='booking.quote'/></Button>
                            <Button type="primary" onClick={this.onContinueBooking}><FormattedMessage
                                id='booking.continueBooking'/></Button>
                        </div>
                    </Layout.Col>
                </Layout.Row>
            </div>
        );
    }
}

export default injectIntl(Booking);
