import React, {Component} from "react";
import './booking.scss';
import {Form, Input, Button, Card, Layout, Checkbox, Select as SelectEl} from 'element-react';
import {FormattedMessage, injectIntl} from "react-intl";
import {LIST_COUNTRY} from "../../App.constant.country";
import Select from 'react-select';
import Autocomplete from 'react-autocomplete';
import {processString} from "../../utils/string";

class SenderAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCountry: [],
        };
    }

    componentWillMount() {
        let newState = Object.assign({}, this.state);
        for (let i = 0; i < LIST_COUNTRY.length; i++) {
            newState.listCountry.push({
                value: LIST_COUNTRY[i].id, label: LIST_COUNTRY[i].country_name
            });
        }
        this.setState(newState);
    }

    onChangeCountry = (selectedOption) => {
        this.props.changeField('country', selectedOption);
    };

    renderItemDropdownCity = (item, isHighlighted) => {
        return <div className={`row ml-0 item-dropdown ${isHighlighted ? 'item-dropdown--highlighted' : ''}`}
                    key={item.id}>
            <div className="col-xs-12 col-sm-4">{item.cityName}</div>
            <div className="col-xs-12 col-sm-4">{item.postalCode}</div>
            <div className="col-xs-12 col-sm-4">{item.stateProvince}</div>
        </div>
    };

    renderMenuCity = (children) => {
        return <div className="dropdown-autocomplete dropdown-autocomplete--city">{children}</div>;
    };

    shouldItemRenderCity = (item, value) => {
        const itemRemoveSign = processString.removeSign(item.cityName).toLowerCase();
        const valueRemoveSign = processString.removeSign(value).toLowerCase();
        return itemRemoveSign.indexOf(valueRemoveSign) > -1;
    };

    onChangeCity = (event, value) => {
        this.props.changeField('cityName', value);
    };

    renderItemDropdownCompany = (item, isHighlighted) => {
        return <div className={`item-dropdown ${isHighlighted ? 'item-dropdown--highlighted' : ''}`} key={item.id}>
            <div className="item-icon">{item.contactName} <i className="fa fa-user"></i></div>
            <div className="item-icon">{item.company} <i className="fa fa-building"></i></div>
            <div className="item-icon">{item.address1} <i className="fa fa-map-marker"></i></div>
            <div>{item.address2}</div>
            <div>{item.cityName} - {item.postalCode}</div>
            <div>{item.countryName}</div>
        </div>
    };

    renderMenuCompany = (children) => {
        return <div className="dropdown-autocomplete">{children}</div>;
    };

    shouldItemRenderCompany = (item, value) => {
        return item.company.toLowerCase().indexOf(value.toLowerCase()) > -1;
    };

    onChangeCompany = (event, value) => {
        this.props.changeField('company', value);
    };

    renderItemDropdownContact = (item, isHighlighted) => {
        return <div className={`item-dropdown ${isHighlighted ? 'item-dropdown--highlighted' : ''}`} key={item.id}>
            <div className="item-icon">{item.contactName} <i className="fa fa-user"></i></div>
            <div className="item-icon">{item.company} <i className="fa fa-building"></i></div>
            <div className="item-icon">{item.address1} <i className="fa fa-map-marker"></i></div>
            <div>{item.address2}</div>
            <div>{item.cityName} - {item.postalCode}</div>
            <div>{item.countryName}</div>
        </div>
    };

    renderMenuContact = (children) => {
        return <div className="dropdown-autocomplete">{children}</div>;
    };

    shouldItemRenderContact = (item, value) => {
        return item.contactName.toLowerCase().indexOf(value.toLowerCase()) > -1;
    };

    onChangeContact = (event, value) => {
        this.props.changeField('contactName', value);
    };

    checkErrorField(fieldName) {
        return this.props.fieldErrors.includes(fieldName) ? 'invalid' : '';
    }

    onChangeCheckbox = (e) => {
        this.props.changeField('saveToAddressBook', !this.props.form.saveToAddressBook)
    };

    onChangeCommonInput = (inputName) => (value) => {
        this.props.changeField(inputName, value);
    };

    onSelectCompany = (value) => {
        this.props.selectCompany(value);
    };

    onSelectContactName = (value) => {
        this.props.selectContactName(value);
    };

    onSelectCity = (value) => {
        this.props.selectCity(value);
    };

    render() {

        const wrapStyleAutocomplete = {
            position: 'relative',
            display: 'inline-block'
        };

        return (
            <div className="mycard sender">
                <Card className="box-card"
                      header={<div className="clearfix pl-3">{this.props.name}</div>}>
                    <div className="row mb-3">
                        <div className="col-xs-12 col-sm-6 pr-2">
                            <div className="label"><FormattedMessage id='booking.company'/><span
                                className="required ml-2">*</span></div>
                            <div className="autocomplete-wrap">
                                <Autocomplete
                                    value={this.props.form.company}
                                    inputProps={{
                                        id: 'company-autocomplete',
                                        className: this.checkErrorField('company')
                                    }}
                                    wrapperStyle={wrapStyleAutocomplete}
                                    items={this.props.data}
                                    getItemValue={item => item.id.toString()}
                                    shouldItemRender={this.shouldItemRenderCompany}
                                    onChange={this.onChangeCompany}
                                    onSelect={this.onSelectCompany}
                                    renderMenu={this.renderMenuCompany}
                                    renderItem={this.renderItemDropdownCompany}
                                />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 pl-2">
                            <div className="label"><FormattedMessage id='booking.phone'/><span
                                className="required ml-2">*</span></div>
                            <Input value={this.props.form.phoneNumber}
                                   className={this.checkErrorField('phoneNumber')}
                                   onChange={this.onChangeCommonInput('phoneNumber')}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-xs-12 col-sm-6 pr-2">
                            <div className="label"><FormattedMessage id='booking.contactName'/><span
                                className="required ml-2">*</span></div>
                            <div className="autocomplete-wrap">
                                <Autocomplete
                                    value={this.props.form.contactName}
                                    inputProps={{
                                        id: 'contact-autocomplete',
                                        className: this.checkErrorField('contactName')
                                    }}
                                    wrapperStyle={wrapStyleAutocomplete}
                                    items={this.props.data}
                                    getItemValue={item => item.id.toString()}
                                    shouldItemRender={this.shouldItemRenderContact}
                                    onChange={this.onChangeContact}
                                    onSelect={this.onSelectContactName}
                                    renderMenu={this.renderMenuContact}
                                    renderItem={this.renderItemDropdownContact}
                                />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 pl-2">
                            <div className="label"><FormattedMessage id='booking.emailAddress'/></div>
                            <Input className={this.checkErrorField('emailAddress')}
                                   value={this.props.form.emailAddress}
                                   onChange={this.onChangeCommonInput('emailAddress')}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-12">
                            <div className="label"><FormattedMessage id='booking.country'/><span
                                className="required ml-2">*</span></div>
                            <div className="dropdown-wrap">
                                <span className="icon"><i className="fa fa-caret-down"></i></span>
                                <Select value={this.props.form.country}
                                        onChange={this.onChangeCountry}
                                        options={this.state.listCountry}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-xs-12 col-sm-6 pr-2">
                            <div className="label"><FormattedMessage id='booking.address'/><span
                                className="required ml-2">*</span></div>
                            <Input value={this.props.form.address1}
                                   className={this.checkErrorField('address1')}
                                   onChange={this.onChangeCommonInput('address1')}/>
                        </div>
                        <div className="col-xs-12 col-sm-6 pl-2">
                            <div className="label"><FormattedMessage id='booking.address2'/></div>
                            <Input value={this.props.form.address2}
                                   onChange={this.onChangeCommonInput('address2')}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-xs-12 text-left pl-3">
                            <Checkbox checked={this.props.form.saveToAddressBook}
                                      onChange={this.onChangeCheckbox}
                                      label={this.props.intl.formatMessage({id: 'booking.saveToAddressBook'})}>
                            </Checkbox>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-xs-12 col-sm-4">
                            <div className="label"><FormattedMessage id='booking.city'/><span
                                className="required ml-2">*</span></div>
                            <div className="autocomplete-wrap">
                                <Autocomplete
                                    value={this.props.form.cityName}
                                    inputProps={{
                                        id: 'city-autocomplete',
                                        className: this.checkErrorField('cityName')
                                    }}
                                    wrapperStyle={wrapStyleAutocomplete}
                                    items={this.props.listCity}
                                    getItemValue={item => item.id.toString()}
                                    shouldItemRender={this.shouldItemRenderCity}
                                    onChange={this.onChangeCity}
                                    onSelect={this.onSelectCity}
                                    renderMenu={this.renderMenuCity}
                                    renderItem={this.renderItemDropdownCity}
                                />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-4 pl-3 pr-3">
                            <div className="label"><FormattedMessage id='booking.postalCode'/></div>
                            <Input value={this.props.form.postalCode}
                                   onChange={this.onChangeCommonInput('postalCode')}/>
                        </div>
                        <div className="col-xs-12 col-sm-4">
                            <div className="label"><FormattedMessage id='booking.stateProvince'/></div>
                            <Input value={this.props.form.stateProvince}
                                   onChange={this.onChangeCommonInput('stateProvince')}/>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default injectIntl(SenderAddress);
