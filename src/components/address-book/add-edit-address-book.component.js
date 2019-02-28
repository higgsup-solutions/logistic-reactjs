import React, {Component} from 'react';
import {Button, Dialog, Form, Input, Layout} from 'element-react';
import './address-book.scss';
import {LIST_COUNTRY} from "../../App.constant.country";
import Select from 'react-select';
import {listDataCity} from "../../integrate/booking";
import {addAddress, updateAddress} from "../../integrate/address-book";
import {FormattedMessage, injectIntl} from "react-intl";

class AddEditAddressBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                rules: {
                    contactName: [
                        {
                            required: true,
                            message: this.props.intl.formatMessage({id: 'ab.addEdit.validation.contactName.required'}),
                            trigger: 'change'
                        }
                    ],
                    address1: [
                        {
                            required: true,
                            message: this.props.intl.formatMessage({id: 'ab.addEdit.validation.address.required'}),
                            trigger: 'change'
                        }
                    ],
                    countryName: [
                        {
                            required: true,
                            message: this.props.intl.formatMessage({id: 'ab.addEdit.validation.country.required'}),
                            trigger: 'change'
                        }
                    ],
                    phoneNumber: [
                        {
                            required: true,
                            message: this.props.intl.formatMessage({id: 'ab.addEdit.validation.phoneNumber.required'}),
                            trigger: 'change'
                        },
                        {
                            validator: (rule, value, callback) => {
                                setTimeout(() => {
                                    if (!/^[+]*\d+$/.test(value)) {
                                        callback(new Error(this.props.intl.formatMessage({id: 'ab.addEdit.validation.phoneNumber.invalid'})));
                                    } else {
                                        callback();
                                    }
                                }, 1000);
                            }, trigger: 'change'
                        }
                    ],
                    email: [
                        {
                            type: 'email',
                            message: this.props.intl.formatMessage({id: 'ab.addEdit.validation.email.invalid'}),
                            trigger: 'blur'
                        }
                    ],
                    cityName: [
                        {
                            required: true,
                            message: this.props.intl.formatMessage({id: 'ab.addEdit.validation.city.required'}),
                            trigger: 'change'
                        }
                    ],
                },
            },

            mode: props.mode,
            addressData: Object.assign({}, props.addressData),

            allCountries: LIST_COUNTRY.map(country => {
                return {
                    value: country.id,
                    label: country.country_name
                }
            }),
            allCities: []
        }
    };

    componentDidMount() {
        if (this.state.addressData.countryId) {
            listDataCity(this.state.addressData.countryId).then(res => {
                if (res.data) {
                    let allCities = res.data.map(city => {
                        return {
                            value: city.cityName,
                            label: city.cityName
                        }
                    });
                    this.setState(
                        Object.assign({}, this.state, {allCities: allCities})
                    );
                }
            });
        }
    }

    onChangeInput = (fieldName) => (e) => {
        let newState = Object.assign({}, this.state);
        newState.addressData[fieldName] = e;
        this.setState(newState);
    };

    onChangeCountry = (selectedOption) => {
        let newAddressData = Object.assign({},
            this.state.addressData,
            {
                countryId: selectedOption.value,
                countryName: selectedOption.label
            });

        listDataCity(selectedOption.value).then(res => {
            let allCities = [];
            if (res.data) {
                allCities = res.data.map(city => {
                    return {
                        value: city.cityName,
                        label: city.cityName
                    }
                });
            }

            this.setState(
                Object.assign({},
                    this.state,
                    {
                        addressData: newAddressData,
                        allCities: allCities
                    }
                )
            );
        });
    };

    onChangeCity = (selectedOption) => {
        let newAddressData = Object.assign({},
            this.state.addressData,
            {cityName: selectedOption.value});

        this.setState(Object.assign({}, this.state, {addressData: newAddressData}));
    };

    saveAddress = () => {
        this.refs.addressForm.validate((valid) => {
            if (!valid) {
                return false;
            }

            if (this.state.mode === 'add') {
                addAddress(this.state.addressData).then(res => {
                    this.props.onSubmit(res.data);
                });
            } else if (this.state.mode === 'edit') {
                updateAddress(this.state.addressData).then(res => {
                    this.props.onSubmit(res.data);
                });
            }
        });
    };

    render() {
        return (
            <Dialog
                visible={this.props.visible}
                title={
                    this.state.mode === 'add' ?
                        this.props.intl.formatMessage({id: 'ab.add.title'}) :
                        this.props.intl.formatMessage({id: 'ab.edit.title'})
                }
                onCancel={ this.props.onCancel }>
                <Dialog.Body>
                    <Form ref="addressForm"
                          labelPosition="top" labelWidth="100"
                          model={this.state.addressData} rules={this.state.form.rules}>
                        <Layout.Row gutter="20">
                            <Layout.Col span="12">
                                <Form.Item
                                    label={this.props.intl.formatMessage({id: 'ab.contactName'})}
                                    prop="contactName">
                                    <Input
                                        value={this.state.addressData.contactName}
                                        onChange={this.onChangeInput('contactName')}/>
                                </Form.Item>
                            </Layout.Col>
                            <Layout.Col span="12">
                                <Form.Item
                                    label={this.props.intl.formatMessage({id: 'ab.stateProvince'})}
                                    prop="stateProvince">
                                    <Input
                                        value={this.state.addressData.stateProvince}
                                        onChange={this.onChangeInput('stateProvince')}/>
                                </Form.Item>
                            </Layout.Col>

                            <Layout.Col span="12">
                                <Form.Item
                                    label={this.props.intl.formatMessage({id: 'ab.company'})}
                                    prop="company">
                                    <Input
                                        value={this.state.addressData.company}
                                        onChange={this.onChangeInput('company')}/>
                                </Form.Item>
                            </Layout.Col>
                            <Layout.Col span="12">
                                <Form.Item
                                    label={this.props.intl.formatMessage({id: 'ab.postalCode'})}
                                    prop="postalCode">
                                    <Input
                                        value={this.state.addressData.postalCode}
                                        onChange={this.onChangeInput('postalCode')}/>
                                </Form.Item>
                            </Layout.Col>

                            <Layout.Col span="12">
                                <Form.Item
                                    label={this.props.intl.formatMessage({id: 'ab.address1'})}
                                    prop="address1">
                                    <Input
                                        value={this.state.addressData.address1}
                                        onChange={this.onChangeInput('address1')}/>
                                </Form.Item>
                            </Layout.Col>
                            <Layout.Col span="12">
                                <Form.Item
                                    label={this.props.intl.formatMessage({id: 'ab.address2'})}
                                    prop="address2">
                                    <Input
                                        value={this.state.addressData.address2}
                                        onChange={this.onChangeInput('address2')}/>
                                </Form.Item>
                            </Layout.Col>

                            <Layout.Col span="12">
                                <Form.Item
                                    label={this.props.intl.formatMessage({id: 'ab.phoneNumber'})}
                                    prop="phoneNumber">
                                    <Input
                                        value={this.state.addressData.phoneNumber}
                                        onChange={this.onChangeInput('phoneNumber')}/>
                                </Form.Item>
                            </Layout.Col>
                            <Layout.Col span="12">
                                <Form.Item
                                    label={this.props.intl.formatMessage({id: 'ab.email'})}
                                    prop="email">
                                    <Input
                                        value={this.state.addressData.email}
                                        onChange={this.onChangeInput('email')}/>
                                </Form.Item>
                            </Layout.Col>

                            <Layout.Col span="12">
                                <Form.Item
                                    label={this.props.intl.formatMessage({id: 'ab.countryName'})}
                                    prop="countryName">
                                    <Select
                                        value={
                                            {
                                                value: this.state.addressData.countryId,
                                                label: this.state.addressData.countryName
                                            }
                                        }
                                        onChange={this.onChangeCountry}
                                        options={this.state.allCountries} />
                                </Form.Item>
                            </Layout.Col>
                            <Layout.Col span="12">
                                <Form.Item
                                    label={this.props.intl.formatMessage({id: 'ab.cityName'})}
                                    prop="cityName">
                                    <Select
                                        value={
                                            {
                                                value: this.state.addressData.cityName,
                                                label: this.state.addressData.cityName
                                            }
                                        }
                                        onChange={this.onChangeCity}
                                        options={this.state.allCities} />
                                </Form.Item>
                            </Layout.Col>
                        </Layout.Row>
                    </Form>
                </Dialog.Body>

                <Dialog.Footer className="dialog-footer">
                    <Button onClick={ this.props.onCancel }>
                        <FormattedMessage id="cancel"/>
                    </Button>
                    <Button onClick={ this.saveAddress } type="primary" >
                        <FormattedMessage id="save"/>
                    </Button>
                </Dialog.Footer>
            </Dialog>
        );
    }
}

export default injectIntl(AddEditAddressBook);
