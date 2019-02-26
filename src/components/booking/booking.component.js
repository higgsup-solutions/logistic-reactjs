import React, {Component} from "react";
import './booking.scss';
import SenderAddress from "./sender-address";
import {Button, Layout} from 'element-react';
import {FormattedMessage, injectIntl} from "react-intl";
import PackageShipment from "./package-shipment";
import {Notification} from 'element-react';
import {REGEX_EMAIL, REGEX_PHONE_NUMBER} from "../../App.constant";
import {
    listCarrier,
    listDataCity,
    listDataSuggest,
    listDimension,
    quote,
    saveAddressToBook
} from "../../integrate/booking";
import {fieldName} from "../../utils/field-name";
import {processString} from "../../utils/string";
import {processNumber} from "../../utils/number";
import Quote from "./quote";
import {navigate} from "@reach/router";
import {CONFIRM} from "../../App.url";

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            listCitySender: [],
            listCityRecipient: [],
            listCarrier: [],
            allCarrier: [],
            listPackageType: [],
            listDimension: [],
            showQuote: false,
            whichButtonClick: null,
            quote: {
                baseCharge: '',
                fuelSurcharge: '',
                totalWeight: '',
                weightType: '',
                totalCharge: '',
            },
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
            packageErrors: [
                []
            ]
        }
    };

    componentWillMount() {
        listDataSuggest().then(res => {
            if (res.status == 'OK') {
                let newState = this.state;
                newState.listData = res.data;
                this.setState(newState);
            }
        });
        listDataCity(this.state.sender.country.value).then(res => {
            if (res.status == 'OK') {
                let newState = this.state;
                if (!res.data) {
                    newState.listCitySender = [];
                } else {
                    newState.listCitySender = res.data;
                }
                this.setState(newState);
            }
        });
        listDataCity(this.state.recipient.country.value).then(res => {
            if (res.status == 'OK') {
                let newState = this.state;
                if (!res.data) {
                    newState.listCityRecipient = [];
                } else {
                    newState.listCityRecipient = res.data;
                }
                this.setState(newState);
            }
        });
        listCarrier().then(res => {
            if (res.status == 'OK') {
                let newState = this.state;
                newState.allCarrier = res.data;
                newState.listCarrier.push(newState.allCarrier[0]);
                newState.listCarrier.push(newState.allCarrier[1]);
                newState.package.carrierId = newState.listCarrier[0].id;
                newState.listPackageType = newState.listCarrier[0].packageDTO;
                newState.package.packageType = newState.listPackageType[0].id;
                this.setState(newState);
            }
        });
        listDimension().then(res => {
            if (res.status == 'OK') {
                let newState = this.state;
                newState.listDimension = res.data;
                this.setState(newState);
            }
        });
    }

    onChangeFieldInput = (who) => (inputName, value) => {
        if (inputName == 'phoneNumber' && processString.checkNotExistCharPhone(value)) {
            return;
        }
        if (inputName == 'postalCode' && processNumber.checkExistNotNumber(value)) {
            return;
        }
        let newState = this.state;
        for (let i = 0; i < newState[`${who}Errors`].length; i++) {
            if (inputName == newState[`${who}Errors`][i]) {
                newState[`${who}Errors`].splice(i, 1);
                break;
            }
        }
        if (inputName == 'country') {
            newState[who].cityName = '';
            newState[who].cityId = -1;
            newState[who].postalCode = '';
            newState[who].stateProvince = '';
            newState.listCarrier = [];
            if (value.value != 288) {
                newState.listCarrier.push(newState.allCarrier[2]);
                newState.listCarrier.push(newState.allCarrier[3]);
            } else {
                newState.listCarrier.push(newState.allCarrier[0]);
                newState.listCarrier.push(newState.allCarrier[1]);
            }
            newState.package.carrierId = newState.listCarrier[0].id;
            newState.listPackageType = newState.listCarrier[0].packageDTO;
            newState.package.packageType = newState.listPackageType[0].id;
        }
        if (inputName == 'carrierId') {
            for (let i = 0; i < this.state.listCarrier.length; i++) {
                if (value == this.state.listCarrier[i].id) {
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
        newState.whichButtonClick = 'continueBooking';
        this.setState(newState);

        newState.senderErrors = [];
        newState.recipientErrors = [];

        const arrError = ['company', 'phoneNumber', 'contactName', 'address1', 'cityName'];
        arrError.forEach(item => {
            this.checkError('sender', item, 'senderErrors');
        });
        arrError.forEach(item => {
            this.checkError('recipient', item, 'recipientErrors');
        });
        let pat = new RegExp(REGEX_EMAIL);
        let patPhone = new RegExp(REGEX_PHONE_NUMBER);
        if (!pat.test(newState.sender.emailAddress)) {
            newState.senderErrors.push('emailAddress');
        }
        if (!pat.test(newState.recipient.emailAddress)) {
            newState.recipientErrors.push('emailAddress');
        }
        if (!newState.senderErrors.includes('phoneNumber') && !patPhone.test(newState.sender.phoneNumber)) {
            newState.senderErrors.push('phoneNumber');
        }
        if (!newState.recipientErrors.includes('phoneNumber') && !patPhone.test(newState.recipient.phoneNumber)) {
            newState.recipientErrors.push('phoneNumber');
        }
        let errMessage = [];
        newState.senderErrors.forEach(item => {
            if (item == 'emailAddress' || item == 'phoneNumber') {
                errMessage.push(<div className="text-danger">Sender {fieldName.mappingBookingPage(item)} is
                    invalid</div>)
            } else {
                errMessage.push(<div className="text-danger">Sender {fieldName.mappingBookingPage(item)} is
                    required</div>)
            }
        });

        newState.recipientErrors.forEach(item => {
            if (item == 'emailAddress') {
                errMessage.push(<div className="text-danger">Recipient {fieldName.mappingBookingPage(item)} is
                    invalid</div>)
            } else {
                errMessage.push(<div className="text-danger">Recipient {fieldName.mappingBookingPage(item)} is
                    required</div>)
            }
        });

        if (this.state.package.contentType == 'Parcel') {
            newState.packageErrors = [];
            this.checkErrorDimension();
            let checkHaveErrorDimension = false;
            for (let i = 0; i < newState.packageErrors.length; i++) {
                if (newState.packageErrors[i].length > 0) {
                    checkHaveErrorDimension = true;
                    break;
                }
            }
            if (checkHaveErrorDimension) {
                errMessage.push(<div className="text-danger">Package dimension is required</div>)
            }
        }

        this.setState(newState);
        if (errMessage.length > 0) {
            Notification.error({
                title: <h5 className="text-danger text-bold">Error</h5>,
                message: errMessage,
                duration: 5000
            });
            return;
        } else {
            if (newState.sender.country.value != 288 && newState.recipient.country.value != 288) {
                errMessage.push(<div className="text-danger">Sender country or recipient country must is Viet
                    Nam</div>);
            }
            if (`${this.state.sender.countryId}@${this.state.sender.address1}@${this.state.sender.cityId}@${this.state.sender.postalCode}`
                == `${this.state.recipient.countryId}@${this.state.recipient.address1}@${this.state.recipient.cityId}@${this.state.recipient.postalCode}`) {
                errMessage.push(<div className="text-danger">Sender address and Recipient address must is not
                    same</div>);
            }
            if (errMessage.length > 0) {
                Notification.error({
                    title: <h5 className="text-danger text-bold">Error</h5>,
                    message: errMessage,
                    duration: 5000
                });
                return;
            }
        }
        if (this.state.sender.saveToAddressBook) {
            this.intergrateSaveAddressToBook('sender');
        }
        if (this.state.recipient.saveToAddressBook) {
            this.intergrateSaveAddressToBook('recipient');
        }
        this.intergrateQuoteAPI();
    };

    intergrateQuoteAPI() {
        let dimensionDTOList = [{
            height: 1,
            length: 1,
            quantity: 1,
            weights: 1,
            width: 1
        }];
        if (this.state.package.contentType == 'Parcel') {
            dimensionDTOList = [];
            this.state.package.documentInfos.forEach(item => {
                dimensionDTOList.push({
                    height: item.h,
                    length: item.l,
                    quantity: item.quantity,
                    weights: item.weights,
                    width: item.w
                })
            })
        }
        const data = {
            carrierId: this.state.package.carrierId,
            contentType: this.state.package.contentType,
            countryId: 288,
            dangerousGoods: this.state.package.dangerousGoods,
            dimensionDTOList: dimensionDTOList,
            packageId: this.state.package.packageType,
            recipientCityName: this.state.sender.cityName,
            senderCityName: this.state.recipient.cityName
        };
        quote(data).then(res => {
            if (res.status == 'OK') {
                let newState = this.state;
                newState.quote.baseCharge = res.data.baseCharge;
                newState.quote.fuelSurcharge = res.data.fuelSurcharge;
                newState.quote.totalWeight = res.data.totalWeight;
                newState.quote.totalCharge = res.data.totalCharge;
                newState.quote.weightType = res.data.weightType;
                if (this.state.whichButtonClick == 'continueBooking') {
                    navigate(CONFIRM,
                        {
                            state: {
                                data: {
                                    sender: this.state.sender,
                                    recipient: this.state.recipient,
                                    package: this.state.package,
                                    chargeInfo: res.data
                                }
                            }
                        }
                    );
                }
                this.setState(newState);
            }
        });
    }

    intergrateSaveAddressToBook(people) {
        if (this.state[people].saveToAddressBook) {
            let data = this.state[people];
            data.receipientDefault = false;
            data.senderDefault = false;
            data.email = this.state[people].emailAddress;
            data.countryId = this.state[people].country.value;
            data.countryName = this.state[people].country.label;

            saveAddressToBook(data).then(res => {
                console.log(res);
            });
        }
    }

    checkError(formError, field, listError) {
        let newState = this.state;
        if (!this.state[formError][field]) {
            newState[listError].push(field);
        }
        this.setState(newState);
    }

    checkErrorDimension() {
        let newState = this.state;
        for (let i = 0; i < this.state.package.documentInfos.length; i++) {
            let item = [];
            for (let dimension in this.state.package.documentInfos[i]) {
                if (!this.state.package.documentInfos[i][dimension]) {
                    item.push(dimension);
                }
            }
            this.state.packageErrors.push(item);
        }
        this.setState(newState);
    }

    onSelectCity = (who) => (id) => {
        const list = `listCity${who.charAt(0).toUpperCase() + who.slice(1)}`;
        let newState = this.state;
        for (let i = 0; i < this.state[list].length; i++) {
            if (id == this.state[list][i].id) {
                newState[who].cityId = this.state[list][i].id;
                newState[who].cityName = this.state[list][i].cityName;
                newState[who].postalCode = this.state[list][i].postalCode;
                newState[who].stateProvince = this.state[list][i].stateProvince;
                break;
            }
        }
        for (let i = 0; i < newState[`${who}Errors`].length; i++) {
            if ('cityName' == newState[`${who}Errors`][i]) {
                newState[`${who}Errors`].splice(i, 1);
                break;
            }
        }
        this.setState(newState);
    };

    onSelectAuto = (who) => (id) => {
        let newState = this.state;
        for (let i = 0; i < this.state.listData.length; i++) {
            if (this.state.listData[i].id == id) {
                newState[who].company = this.state.listData[i].company;
                newState[who].phoneNumber = this.state.listData[i].phoneNumber;
                newState[who].contactName = this.state.listData[i].contactName;
                newState[who].emailAddress = this.state.listData[i].emailAddress;
                newState[who].countryId = this.state.listData[i].countryId;
                newState[who].countryName = this.state.listData[i].countryName;
                newState[who].address1 = this.state.listData[i].address1;
                newState[who].address2 = this.state.listData[i].address2;
                newState[who].cityId = this.state.listData[i].cityId;
                newState[who].cityName = this.state.listData[i].cityName;
                newState[who].postalCode = this.state.listData[i].postalCode;
                newState[who].stateProvince = this.state.listData[i].stateProvince;
                newState[who].country.label = this.state.listData[i].countryName;
                newState[who].country.value = this.state.listData[i].countryId;
                break;
            }
        }
        newState[`${who}Errors`] = [];
        this.setState(newState);
    };

    onChangeDimension = (index, value) => {
        let newState = this.state;
        for (let i = 0; i < this.state.listDimension.length; i++) {
            if (value == this.state.listDimension[i].id) {
                newState.package.documentInfos[index].l = this.state.listDimension[i].length;
                newState.package.documentInfos[index].w = this.state.listDimension[i].width;
                newState.package.documentInfos[index].h = this.state.listDimension[i].height;
                break;
            }
        }
        this.setState(newState);
    };

    onChangeRowDimension = (index, field, value) => {
        if (processNumber.checkExistNotNumberFloat(value)) {
            return;
        }
        let newState = this.state;
        newState.package.documentInfos[index][field] = value;
        for (let i = 0; i < newState.packageErrors[index].length; i++) {
            if (field == newState.packageErrors[index][i]) {
                newState.packageErrors[index].splice(i, 1);
                break;
            }
        }
        this.setState(newState);
    };

    onAddPiece = () => {
        let newState = this.state;
        newState.package.documentInfos.push({
            weights: null,
            l: null,
            w: null,
            h: null,
            quantity: null
        });
        newState.packageErrors.push([]);
        this.setState(newState);
    };

    onDeleteRowDocument = (index) => {
        let newState = this.state;
        newState.package.documentInfos.splice(index, 1);
        newState.packageErrors.splice(index, 1);
        this.setState(newState);
    };

    onQuote = (e) => {
        let newState = this.state;
        newState.whichButtonClick = 'quote';
        this.setState(newState);

        newState.senderErrors = [];
        newState.recipientErrors = [];
        let errMessage = [];
        if (!newState.sender.cityName) {
            newState.senderErrors.push('cityName');
            errMessage.push(<div className="text-danger">Sender City is required</div>)
        }
        if (!newState.recipient.cityName) {
            newState.recipientErrors.push('cityName');
            errMessage.push(<div className="text-danger">Recipient City is required</div>)
        }

        if (newState.package.contentType == 'Parcel') {
            newState.packageErrors = [];
            this.checkErrorDimension();
            let checkHaveErrorDimension = false;
            for (let i = 0; i < newState.packageErrors.length; i++) {
                if (newState.packageErrors[i].length > 0) {
                    checkHaveErrorDimension = true;
                    break;
                }
            }
            if (checkHaveErrorDimension) {
                errMessage.push(<div className="text-danger">Package dimension is required</div>)
            }
        }
        this.setState(newState);
        if (errMessage.length > 0) {
            Notification.error({
                title: <h5 className="text-danger text-bold">Error</h5>,
                message: errMessage,
                duration: 3000
            });
            return;
        } else {
            this.intergrateQuoteAPI();
            newState.showQuote = true;
            this.setState(newState);
        }
    };

    onCloseQuote = () => {
        let newState = this.state;
        newState.showQuote = false;
        this.setState(newState);
    };

    render() {

        return (
            <div className="booking">
                <div className="row w-100 ml-0">
                    <div className="col-sm-12 col-md-6">
                        <SenderAddress data={this.state.listData}
                                       listCity={this.state.listCitySender}
                                       form={this.state.sender}
                                       changeField={this.onChangeFieldInput('sender')}
                                       selectCity={this.onSelectCity('sender')}
                                       selectContactName={this.onSelectAuto('sender')}
                                       selectCompany={this.onSelectAuto('sender')}
                                       fieldErrors={this.state.senderErrors}
                                       name={this.props.intl.formatMessage({id: 'booking.senderAddress'})}/>
                        <SenderAddress data={this.state.listData}
                                       listCity={this.state.listCityRecipient}
                                       form={this.state.recipient}
                                       changeField={this.onChangeFieldInput('recipient')}
                                       selectCity={this.onSelectCity('recipient')}
                                       selectContactName={this.onSelectAuto('recipient')}
                                       selectCompany={this.onSelectAuto('recipient')}
                                       fieldErrors={this.state.recipientErrors}
                                       name={this.props.intl.formatMessage({id: 'booking.recipientAddress'})}/>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <PackageShipment form={this.state.package}
                                         listCarrier={this.state.listCarrier}
                                         listPackageType={this.state.listPackageType}
                                         addPiece={this.onAddPiece}
                                         onChangeDropdown={this.onChangeFieldInput('package')}
                                         listDimension={this.state.listDimension}
                                         fieldErrors={this.state.packageErrors}
                                         deleteRowDocument={this.onDeleteRowDocument}
                                         changeDimension={this.onChangeDimension}
                                         changeRowDimension={this.onChangeRowDimension}
                                         changeField={this.onChangeFieldInput('package')}/>
                        <div className="text-right pr-3">
                            <Button type="primary" onClick={this.onQuote}><FormattedMessage
                                id='booking.quote'/></Button>
                            <Button type="primary" onClick={this.onContinueBooking}><FormattedMessage
                                id='booking.continueBooking'/></Button>
                        </div>
                        <Quote showQuote={this.state.showQuote}
                               data={this.state.quote}
                               closeQuote={this.onCloseQuote}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectIntl(Booking);
