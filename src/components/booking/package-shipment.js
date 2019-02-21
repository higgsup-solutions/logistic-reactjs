import React, {Component} from "react";
import './booking.scss';
import {Layout, DatePicker, Input, Card, Select, Radio, Form, Table, Checkbox, Button} from 'element-react';
import {FormattedMessage, injectIntl} from "react-intl";

class PackageShipment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contents: 'Documents',
        };
    }

    onChangeContent = (value) => {
        this.props.changeField('contentType', value);
    };

    onChangeShippingDate = (date) => {
        this.props.changeField('shippingDate', date);
    };

    onAddPiece = (e) => {
        this.props.addPiece();
    };

    onChangeDangerous = (value) => {
        this.props.changeField('dangerousGoods', value);
    };

    onChangeDropdown = (field) => (value) => {
        console.log(field);
        console.log(value); return;
        this.props.changeField(field, value);
    };

    onDeleteRowDocument = (index) => (e) => {
        this.props.deleteRowDocument(index);
    };

    render() {

        const domListDocument = this.props.form.documentInfos.map((item, key) =>
            <tr key={key}>
                <td>{key + 1}</td>
                <td><Input/></td>
                <td>
                    <Select className="w-100"
                            placeholder={this.props.intl.formatMessage({id: 'booking.selectOneCountry'})}>
                        <Select.Option label="Zone 1" value="shanghai"></Select.Option>
                        <Select.Option label="Zone 2" value="beijing"></Select.Option>
                        <Select.Option label="Zone 2" value="beijing"></Select.Option>
                    </Select>
                </td>
                <td>
                    <Input/>
                </td>
                <td>
                    <Input/>
                </td>
                <td>
                    <Input/>
                </td>
                <td>
                    <Input/>
                </td>
                <td>{key != 0 ? <i className="fa fa-times-circle"
                                   onClick={this.onDeleteRowDocument(key)}></i> : ''}</td>
            </tr>
        );


        return (
            <div className="mycard package">
                <Card className="box-card"
                      header={<div className="clearfix"><FormattedMessage id='booking.packageShipment'/></div>}>
                    <div className="row mb-3 pl-3">
                        <div className="col-xs-12 text-left">
                            <div className="label"><FormattedMessage id='booking.shippingDate'/></div>
                            <DatePicker disabledDate={time => time.getTime() < Date.now() - 8.64e7}
                                        onChange={this.onChangeShippingDate}
                                        placeholder={this.props.intl.formatMessage({id: 'booking.chooseOneShippingDate'})}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-xs-12 col-sm-6 pr-2">
                            <div className="label"><FormattedMessage id='booking.carrier'/><span
                                className="required ml-2">*</span></div>
                            <Select className="w-100"
                                    value={this.props.form.carrierId}
                                    onChange={this.onChangeDropdown('carrierId')}
                                    placeholder={this.props.intl.formatMessage({id: 'booking.selectOneCarrier'})}>
                                {this.props.listCarrier.map(item => <Select.Option key={item.id} label={item.carrierType} value={item.id}></Select.Option>)}
                            </Select>
                        </div>
                        <div className="col-xs-12 col-sm-6 pl-2">
                            <div className="label"><FormattedMessage id='booking.serviceType'/><span
                                className="required ml-2">*</span></div>
                            <Select className="w-100"
                                    onChange={this.onChangeDropdown('serviceType')}
                                    placeholder={this.props.intl.formatMessage({id: 'booking.selectOneService'})}>
                                <Select.Option label="Express" value="1"></Select.Option>
                                <Select.Option label="Economy Express" value="1"></Select.Option>
                                <Select.Option label="DHL Worldwide Express" value="1"></Select.Option>
                                <Select.Option label="Expedited" value="1"></Select.Option>
                                <Select.Option label="Express Saver" value="1"></Select.Option>
                            </Select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-12 col-sm-6">
                            <div className="label"><FormattedMessage id='booking.packageType'/></div>
                            <Select className="w-100"
                                    value={this.props.form.packageType}
                                    onChange={this.onChangeDropdown('packageType')}
                                    placeholder={this.props.intl.formatMessage({id: 'booking.selectOnePackage'})}>
                                {this.props.listPackageType.map(item => <Select.Option key={item.id} label={item.packageType} value={item.id}></Select.Option>)}
                            </Select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-xs-12 col-sm-6 text-left">
                            <div className="label"><FormattedMessage id='booking.contents'/><span
                                className="required ml-2">*</span></div>
                            <div>
                                <Radio value="Documents" checked={this.props.form.contentType == 'Documents'}
                                       onChange={this.onChangeContent}></Radio>
                                <Radio value="Parcel" checked={this.props.form.contentType == 'Parcel'}
                                       onChange={this.onChangeContent}></Radio>
                            </div>
                        </div>
                    </div>
                    <div className="table-wrap">
                        {this.props.form.contentType == 'Parcel' ? <div className="cover"></div> : ''}
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th rowSpan="2" className="width-50">Row</th>
                                <th rowSpan="2" className="width-100">Weights (Kgs)*</th>
                                <th rowSpan="2" className="width-150"></th>
                                <th colSpan="3">Dimensions(cm)</th>
                                <th rowSpan="2" className="width-100">Quantity*</th>
                                <th rowSpan="2" className="width-50"></th>
                            </tr>
                            <tr>
                                <th className="width-100">L</th>
                                <th className="width-100">W</th>
                                <th className="width-100">H</th>
                            </tr>
                            </thead>
                            <tbody>
                            {domListDocument}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-left mt-1">
                        <Button type="primary" size="small" onClick={this.onAddPiece}><FormattedMessage
                            id='booking.addPiece'/></Button>
                    </div>
                    <div className="mt-3 text-left">
                        <Checkbox checked={this.props.form.dangerousGoods}
                                  onChange={this.onChangeDangerous}>Dangerous Goods</Checkbox>
                    </div>
                </Card>
            </div>
        );
    }
}

export default injectIntl(PackageShipment);
