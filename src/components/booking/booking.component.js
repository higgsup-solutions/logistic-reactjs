import React, {Component} from "react";
import './booking.scss';
import SenderAddress from "./sender-address";
import {Button, Layout} from 'element-react';
import {FormattedMessage, injectIntl} from "react-intl";
import PackageShipment from "./package-shipment";
import {Notification} from 'element-react';
import {REGEX_EMAIL} from "../../App.constant";
import {listCarrier, listDataCity, listDataSuggest, listDimension} from "../../integrate/booking";

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            listCity: [],
            listCarrier: [],
            listPackageType: [],
            listDimension: [],
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
                serviceType: '1',
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
            if(res.status == 'OK') {
                let newState = this.state;
                if(!res.data) {
                    newState.listCity = [];
                } else {
                    newState.listCity = res.data;
                }
                this.setState(newState);
            }
        });
        listCarrier().then(res => {
            if(res.responseMessage.status == 'OK') {
                let newState = this.state;
                newState.listCarrier = res.responseMessage.data;
                newState.package.carrierId = newState.listCarrier[0].id;
                newState.listPackageType = newState.listCarrier[0].packageDTO;
                newState.package.packageType = newState.listPackageType[0].id;
                this.setState(newState);
            }
        });
        listDimension().then(res => {
            if(res.responseMessage.status == 'OK') {
                let newState = this.state;
                newState.listDimension = res.responseMessage.data;
                this.setState(newState);
            }
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
        if(inputName == 'carrierId') {
            for(let i = 0 ; i < this.state.listCarrier.length; i++) {
                if(value == this.state.listCarrier[i].id) {
                    newState.listPackageType = this.state.listCarrier[i].packageDTO;
                    newState.package.packageType = newState.listPackageType[0].id;
                    break;
                }
            }
        }
        newState[who][inputName] = value;
        this.setState(newState);
    };

    onContinueBooking = (e) => {
        let newState = this.state;
        const arrError = ['company', 'phoneNumber', 'contactName', 'address1', 'cityName'];
        arrError.forEach(item => {
            this.checkError('sender', item, 'senderErrors');
        });
        // if(!this.state.sender.company) {
        //     newState.senderErrors.push('company');
        // }
        // if(!this.state.sender.phoneNumber) {
        //     newState.senderErrors.push('phoneNumber');
        // }
        // if(!this.state.sender.contactName) {
        //     newState.senderErrors.push('contactName');
        // }
        // if(!this.state.sender.address1) {
        //     newState.senderErrors.push('address1');
        // }
        // if(!this.state.sender.cityName) {
        //     newState.senderErrors.push('cityName');
        // }
        this.setState(newState);
        return;
        Notification.error({
            title: <h5 className="text-danger text-bold">Error</h5>,
            message: <div className="text-danger">
                <div>email invalid</div>
                <div>company is required</div>
            </div>,
        });
    };

    checkError(formError, field, listError) {
        let newState = this.state;
        if(!this.state[formError][field]) {
            newState[listError].push(field);
        }
        this.setState(newState);
    }

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

    onChangeDimension = (index, value) => {
        let newState = this.state;
        for(let i = 0 ; i < this.state.listDimension.length; i++) {
            if(value == this.state.listDimension[i].id) {
                newState.package.documentInfos[index].l = this.state.listDimension[i].length;
                newState.package.documentInfos[index].w = this.state.listDimension[i].width;
                newState.package.documentInfos[index].h = this.state.listDimension[i].height;
                break;
            }
        }
        this.setState(newState);
    };

    onChangeRowDimension = (index, field, value) => {
        let newState = this.state;
        newState.package.documentInfos[index][field] = value;
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
        console.log(this.state.package.documentInfos)
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
                                         onChangeDropdown = {this.onChangeFieldInput('package')}
                                         listDimension = {this.state.listDimension}
                                         deleteRowDocument = {this.onDeleteRowDocument}
                                         changeDimension = {this.onChangeDimension}
                                         changeRowDimension = {this.onChangeRowDimension}
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
