import React, {Component} from "react";
import './booking.scss';
import {Form, Input, Button, Card, Layout, Select, Checkbox} from 'element-react';
import {FormattedMessage, injectIntl} from "react-intl";

class SenderAddress extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.intl.formatMessage({id: 'booking.senderAddress'}))
    }

    render() {

        return (
            <div className="mycard sender">
                <Card className="box-card"
                      header={<div className="clearfix">{this.props.name}</div>}>
                    <Layout.Row className="mb-3">
                        <Layout.Col span="12" className="pr-2">
                            <div className="label"><FormattedMessage id='booking.company'/><span
                                className="required ml-2">*</span></div>
                            <Input/>
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
                            <Select className="w-100" placeholder={this.props.intl.formatMessage({id: 'booking.selectOneCountry'})}>
                                <Select.Option label="Zone 1" value="shanghai"></Select.Option>
                                <Select.Option label="Zone 2" value="beijing"></Select.Option>
                                <Select.Option label="Zone 2" value="beijing"></Select.Option>
                                <Select.Option label="Zone 2" value="beijing"></Select.Option>
                                <Select.Option label="Zone 2" value="beijing"></Select.Option>
                                <Select.Option label="Zone 2" value="beijing"></Select.Option>
                                <Select.Option label="Zone 2" value="beijing"></Select.Option>
                                <Select.Option label="Zone 2" value="beijing"></Select.Option>
                                <Select.Option label="Zone 2" value="beijing"></Select.Option>
                                <Select.Option label="Zone 2" value="beijing"></Select.Option>
                                <Select.Option label="Zone 2" value="beijing"></Select.Option>
                                <Select.Option label="Zone 2" value="beijing"></Select.Option>
                                <Select.Option label="Zone 2" value="beijing"></Select.Option>
                                <Select.Option label="Zone 2" value="beijing"></Select.Option>
                                <Select.Option label="Zone 2" value="beijing"></Select.Option>
                                <Select.Option label="Zone 2" value="beijing"></Select.Option>
                            </Select>
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
                            <Checkbox label={this.props.intl.formatMessage({id: 'booking.saveToAddressBook'})}></Checkbox>
                        </Layout.Col>
                    </Layout.Row>
                    <Layout.Row className="mb-3">
                        <Layout.Col span="8">
                            <div className="label"><FormattedMessage id='booking.city'/><span
                                className="required ml-2">*</span></div>
                            <Input/>
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
