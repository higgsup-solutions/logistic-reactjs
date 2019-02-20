import React, {Component} from "react";
import './booking.scss';
import {Form, Input, Button, Card, Layout, Checkbox, Select as SelectEl} from 'element-react';
import {FormattedMessage, injectIntl} from "react-intl";
import {LIST_COUNTRY} from "../../App.constant.country";
import Select from 'react-select';
import Autocomplete from 'react-autocomplete';
import { debounce } from "throttle-debounce";

class SenderAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCountry: [],
            countrySelected: { label: "Viet Nam", value: 288 }
        };
        this.autocompleteSearchDebounced = debounce(500, this.autocompleteSearch);
        console.log(this.props.fieldErrors);
    }

    componentWillMount() {
        let newState = this.state;
        for (let i = 0; i < LIST_COUNTRY.length; i++) {
            newState.listCountry.push({
                value: LIST_COUNTRY[i].id, label: LIST_COUNTRY[i].country_name
            });
        }
        this.setState(newState);
    }

    onChangeCountry = (selectedOption) => {
        this.setState({countrySelected: selectedOption});
    };

    autocompleteSearch = q => {
        this._fetch(q);
    };


    _fetch = q => {
        console.log(q);
        const _searches = this.state._searches || [];
        _searches.push(q);
        this.setState({ _searches });
    };

    renderItemDropdownCity = (item, isHighlighted) => {
        return  <div className={`item-dropdown ${isHighlighted ? 'item-dropdown--highlighted' : ''}`}
                            key={ item.abbr } >
                    { item.name } --- {item.abbr}
                </div>
    };

    renderMenuCity = (children) => {
        return <div className="dropdown-autocomplete dropdown-autocomplete--city">{children}</div>;
    };

    shouldItemRenderCity = (item, value) => {
        return item.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
    };

    onChangeCity = (event, value) => {
        this.setState({ value });
        this.autocompleteSearchDebounced(value);
    };

    renderItemDropdownCompany = (item, isHighlighted) => {
        return  <div className={`item-dropdown ${isHighlighted ? 'item-dropdown--highlighted' : ''}`}
                     key={ item.abbr } >
            { item.name } --- {item.abbr}
        </div>
    };

    renderMenuCompany = (children) => {
        return <div className="dropdown-autocomplete">{children}</div>;
    };

    shouldItemRenderCompany = (item, value) => {
        return item.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
    };

    onChangeCompany = (event, value) => {
        this.setState({ value });
        this.autocompleteSearchDebounced(value);
    };

    renderItemDropdownContact = (item, isHighlighted) => {
        return  <div className={`item-dropdown ${isHighlighted ? 'item-dropdown--highlighted' : ''}`}
                     key={ item.abbr } >
            { item.name } --- {item.abbr}
        </div>
    };

    renderMenuContact = (children) => {
        return <div className="dropdown-autocomplete">{children}</div>;
    };

    shouldItemRenderContact = (item, value) => {
        return item.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
    };

    onChangeContact = (event, value) => {
        this.setState({ value });
        this.autocompleteSearchDebounced(value);
    };

    checkErrorField(fieldName) {
        return this.props.fieldErrors.includes(fieldName)? 'invalid' : '';
    }

    render() {

        const wrapStyleAutocomplete = {
            position: 'relative',
            display: 'inline-block'
        };

        return (
            <div className="mycard sender">
                <Card className="box-card"
                      header={<div className="clearfix">{this.props.name}</div>}>
                    <Layout.Row className="mb-3">
                        <Layout.Col span="12" className="pr-2">
                            <div className="label"><FormattedMessage id='booking.company'/><span
                                className="required ml-2">*</span></div>
                            <div className="autocomplete-wrap">
                                <Autocomplete
                                    value={ this.state.value }
                                    inputProps={{ id: 'states-autocomplete-company', className: this.checkErrorField('company') }}
                                    wrapperStyle={wrapStyleAutocomplete}
                                    items={this.props.data }
                                    getItemValue={ item => item.abbr }
                                    shouldItemRender= {this.shouldItemRenderCompany}
                                    onChange={this.onChangeCompany}
                                    onSelect={ value => this.setState({ value }) }
                                    renderMenu={this.renderMenuCompany}
                                    renderItem={this.renderItemDropdownCompany}
                                />
                            </div>
                        </Layout.Col>
                        <Layout.Col span="12" className="pl-2">
                            <div className="label"><FormattedMessage id='booking.phone'/><span
                                className="required ml-2">*</span></div>
                            <Input/>
                        </Layout.Col>
                    </Layout.Row>
                    <Layout.Row className="mb-3">
                        <Layout.Col span="12" className="pr-2">
                            <div className="label"><FormattedMessage id='booking.contactName'/><span
                                className="required ml-2">*</span></div>
                            <div className="autocomplete-wrap">
                                <Autocomplete
                                    value={ this.state.value }
                                    inputProps={{ id: 'states-autocomplete-contact', className: this.checkErrorField('contact') }}
                                    wrapperStyle={wrapStyleAutocomplete}
                                    items={this.props.data }
                                    getItemValue={ item => item.abbr }
                                    shouldItemRender= {this.shouldItemRenderContact}
                                    onChange={this.onChangeContact}
                                    onSelect={ value => this.setState({ value }) }
                                    renderMenu={this.renderMenuContact}
                                    renderItem={this.renderItemDropdownContact}
                                />
                            </div>
                        </Layout.Col>
                        <Layout.Col span="12" className="pl-2">
                            <div className="label"><FormattedMessage id='booking.emailAddress'/></div>
                            <Input className={this.checkErrorField('email')} />
                        </Layout.Col>
                    </Layout.Row>
                    <Layout.Row className="mb-3">
                        <Layout.Col span="24">
                            <div className="label"><FormattedMessage id='booking.country'/><span
                                className="required ml-2">*</span></div>
                            <div className="dropdown-wrap">
                                <span className="icon"><i className="fa fa-caret-down"></i></span>
                                <Select value={this.state.countrySelected}
                                        onChange={this.onChangeCountry}
                                        options={this.state.listCountry}
                                />
                            </div>
                        </Layout.Col>
                    </Layout.Row>
                    <Layout.Row className="mb-3">
                        <Layout.Col span="12" className="pr-2">
                            <div className="label"><FormattedMessage id='booking.address'/><span
                                className="required ml-2">*</span></div>
                            <Input/>
                        </Layout.Col>
                        <Layout.Col span="12" className="pl-2">
                            <div className="label"><FormattedMessage id='booking.address2'/></div>
                            <Input/>
                        </Layout.Col>
                    </Layout.Row>
                    <Layout.Row className="mb-3">
                        <Layout.Col span="24" className="text-left">
                            <Checkbox
                                label={this.props.intl.formatMessage({id: 'booking.saveToAddressBook'})}></Checkbox>
                        </Layout.Col>
                    </Layout.Row>
                    <Layout.Row className="mb-3">
                        <Layout.Col span="8">
                            <div className="label"><FormattedMessage id='booking.city'/><span
                                className="required ml-2">*</span></div>
                            <div className="autocomplete-wrap">
                                <Autocomplete
                                    value={ this.state.value }
                                    inputProps={{ id: 'states-autocomplete-city', className: this.checkErrorField('city') }}
                                    wrapperStyle={wrapStyleAutocomplete}
                                    items={this.props.data }
                                    getItemValue={ item => item.abbr }
                                    shouldItemRender= {this.shouldItemRenderCity}
                                    onChange={this.onChangeCity}
                                    onSelect={ value => this.setState({ value }) }
                                    renderMenu={this.renderMenuCity}
                                    renderItem={this.renderItemDropdownCity}
                                />
                            </div>
                        </Layout.Col>
                        <Layout.Col span="8" className="pl-3 pr-3">
                            <div className="label"><FormattedMessage id='booking.postalCode'/></div>
                            <Input/>
                        </Layout.Col>
                        <Layout.Col span="8">
                            <div className="label"><FormattedMessage id='booking.stateProvince'/></div>
                            <Input/>
                        </Layout.Col>
                    </Layout.Row>
                </Card>
            </div>
        );
    }
}

export default injectIntl(SenderAddress);
