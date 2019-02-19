import React, {Component} from "react";
import './booking.scss';
import {Layout, DatePicker, Input, Card, Select, Radio, Form, Table, Checkbox} from 'element-react';
import {FormattedMessage, injectIntl} from "react-intl";

class PackageShipment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contents: 'Documents',

        }
    }

    onChange = (input) => (e) => {
        this.setState({contents: e})
    };

    render() {

        return (
            <div className="mycard package">
                <Card className="box-card"
                      header={<div className="clearfix"><FormattedMessage id='booking.packageShipment'/></div>}>
                    <Layout.Row className="mb-3">
                        <Layout.Col span="12" className="text-left">
                            <div className="label"><FormattedMessage id='booking.shippingDate'/></div>
                            <DatePicker
                                placeholder={this.props.intl.formatMessage({id: 'booking.chooseOneShippingDate'})}
                            />
                        </Layout.Col>
                    </Layout.Row>
                    <Layout.Row className="mb-3">
                        <Layout.Col span="12" className="pr-2">
                            <div className="label"><FormattedMessage id='booking.carrier'/><span
                                className="required ml-2">*</span></div>
                            <Select className="w-100"
                                    placeholder={this.props.intl.formatMessage({id: 'booking.selectOneCountry'})}>
                                <Select.Option label="Zone 1" value="shanghai"></Select.Option>
                                <Select.Option label="Zone 2" value="beijing"></Select.Option>
                                <Select.Option label="Zone 2" value="beijing"></Select.Option>
                            </Select>
                        </Layout.Col>
                        <Layout.Col span="12" className="pl-2">
                            <div className="label"><FormattedMessage id='booking.serviceType'/><span
                                className="required ml-2">*</span></div>
                            <Select className="w-100"
                                    placeholder={this.props.intl.formatMessage({id: 'booking.selectOneCountry'})}>
                                <Select.Option label="Zone 1" value="shanghai"></Select.Option>
                                <Select.Option label="Zone 2" value="beijing"></Select.Option>
                                <Select.Option label="Zone 2" value="beijing"></Select.Option>
                            </Select>
                        </Layout.Col>
                    </Layout.Row>
                    <Layout.Row className="mb-3">
                        <Layout.Col span="24">
                            <div className="label"><FormattedMessage id='booking.packageType'/></div>
                            <Select className="w-100"
                                    placeholder={this.props.intl.formatMessage({id: 'booking.selectOneCountry'})}>
                                <Select.Option label="Zone 1" value="shanghai"></Select.Option>
                                <Select.Option label="Zone 2" value="beijing"></Select.Option>
                            </Select>
                        </Layout.Col>
                    </Layout.Row>
                    <Layout.Row className="mb-3">
                        <Layout.Col span="24" className="text-left">
                            <div className="label"><FormattedMessage id='booking.contents'/><span
                                className="required ml-2">*</span></div>
                            <Radio.Group value={this.state.contents} onChange={this.onChange('contents')}>
                                <Radio value="Documents" checked={this.state.contents == 'Documents'}></Radio>
                                <Radio value="Parcel" checked={this.state.contents == 'Parcel'}></Radio>
                            </Radio.Group>
                        </Layout.Col>
                    </Layout.Row>
                    <div className="table-wrap">
                        {this.state.contents === 'Parcel' ? <div className="cover"></div> : ''}
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th rowSpan="2">Row</th>
                                <th rowSpan="2">Weights (Kgs)*</th>
                                <th rowSpan="2"></th>
                                <th colSpan="3">Dimensions(cm)</th>
                                <th rowSpan="2">Quantity*</th>
                            </tr>
                            <tr>
                                <th>L</th>
                                <th>W</th>
                                <th>H</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <Layout.Row className="mt-3">
                        <Layout.Col span="24" className="text-left">
                            <Checkbox>Dangerous Goods</Checkbox>
                        </Layout.Col>
                    </Layout.Row>
                </Card>
            </div>
        );
    }
}

export default injectIntl(PackageShipment);
