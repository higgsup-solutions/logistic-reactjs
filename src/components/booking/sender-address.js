import React, {Component} from "react";
import './booking.scss';
import {Form, Input, Button, Card, Layout, Checkbox, Select as SelectEl} from 'element-react';
import {FormattedMessage, injectIntl} from "react-intl";
import {LIST_COUNTRY} from "../../App.constant.country";
import Select from 'react-select';
import Autocomplete from 'react-autocomplete';

class SenderAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCountry: [],
            countrySelected: { label: "Viet Nam", value: 288 }
        }
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

    onSearchCity = (query) => {
        if (query !== '') {
            this.setState({
                loading: true
            });

            setTimeout(() => {
                this.setState({
                    loading: false,
                    options: this.state.states.map(item => {
                        return { value: item, label: item };
                    }).filter(item => {
                        return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
                    })
                });
            }, 200);
        } else {
            this.setState({
                options: []
            });
        }
    };

    render() {

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
                                    inputProps={{ id: 'states-autocomplete' }}
                                    wrapperStyle={{ position: 'relative', display: 'inline-block' }}
                                    items={this.props.data }
                                    getItemValue={ item => item.abbr }
                                    shouldItemRender= {(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                    onChange={(event, value) => this.setState({ value }) }
                                    onSelect={ value => this.setState({ value }) }
                                    renderMenu={ children => <div className="dropdown-autocomplete">{children}</div>}
                                    renderItem={ (item, isHighlighted) => (
                                        <div className={`item-dropdown ${isHighlighted ? 'item-dropdown--highlighted' : ''}`}
                                            key={ item.abbr } >
                                            { item.name } --- {item.abbr}
                                        </div>
                                    )}
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
                            <Input/>
                        </Layout.Col>
                        <Layout.Col span="12" className="pl-2">
                            <div className="label"><FormattedMessage id='booking.emailAddress'/></div>
                            <Input/>
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
                            {/*<SelectEl value={this.props.}*/}
                                      {/*filterable={true}*/}
                                      {/*remote={true}*/}
                                      {/*remoteMethod={this.onSearchCity}>*/}
                                {/*{*/}
                                    {/*this.state.options.map(el => {*/}
                                        {/*return <Select.Option key={el.value} label={el.label} value={el.value} />*/}
                                    {/*})*/}
                                {/*}*/}
                            {/*</SelectEl>*/}
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
