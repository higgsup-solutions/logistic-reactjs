import React, {Component} from "react";
import './booking.scss';
import {Layout, DatePicker, Input, Card, Select, Radio, Form, Table, Checkbox} from 'element-react';
import {FormattedMessage, injectIntl} from "react-intl";

class PackageShipment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contents: 'Documents',
            columns: [
                {
                    label: "Row",
                    prop: "row",
                    width: 80
                },
                {
                    label: "Weight (Kgs)*",
                    prop: "weight",
                    width: 120,
                },
                {
                    label: "",
                    prop: "empty",
                    width: 180,
                },
                {
                    label: "Dimensions (cm)",
                    prop: "dimensions",
                    subColumns: [
                        {
                            label: "L",
                            prop: "l",
                            width: 90
                        },
                        {
                            label: "W",
                            prop: "w",
                            width: 90
                        },
                        {
                            label: "H",
                            prop: "h",
                            width: 90
                        }
                    ]
                },
                {
                    label: "Non-standard packages",
                    prop: "nonStandard",
                    width: 180,
                }
            ],
            data: [{
                row: 1,
                weight: <Input size="small" />,
                l: <Input size="small" />,
                w: <Input size="small" />,
                h: <Input size="small" />,
                empty: <Select>

                </Select>,
                nonStandard: <Checkbox checked>Option</Checkbox>,
            }]
        }
    }

    onChange = (input) => (e) => {
        console.log(e);
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
                    <Table
                        className="mb-3"
                        style={{width: '100%'}}
                        columns={this.state.columns}
                        data={this.state.data}
                        border={true}
                        height={250}
                    />
                    <Layout.Row className="mb-3">
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
