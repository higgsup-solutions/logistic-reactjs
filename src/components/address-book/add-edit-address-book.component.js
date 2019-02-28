import React, {Component} from 'react';
import {Button, Dialog, Form, Input, Layout} from 'element-react';
import './address-book.scss';
import {LIST_COUNTRY} from "../../App.constant.country";
import Select from 'react-select';
import {listDataCity} from "../../integrate/booking";
import {login} from "../../integrate/auth";
import TokenStorage from "../../utils/token";
import {navigate} from "@reach/router";
import {addAddress, updateAddress} from "../../integrate/address-book";

class AddEditAddressBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                rules: {
                    contactName: [
                        {
                            required: true,
                            message: "Contact name is required",
                            trigger: 'change'
                        }
                    ],
                    address1: [
                        {
                            required: true,
                            message: "Address is required",
                            trigger: 'change'
                        }
                    ],
                    countryName: [
                        {
                            required: true,
                            message: "Country is required",
                            trigger: 'change'
                        }
                    ],
                    phoneNumber: [
                        {
                            required: true,
                            message: "Phone number is required",
                            trigger: 'change'
                        },
                        {
                            validator: (rule, value, callback) => {
                                setTimeout(() => {
                                    if (!/^[+]*\d+$/.test(value)) {
                                        callback(new Error('Invalid phone number'));
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
                            message: "Email is invalid",
                            trigger: 'blur'
                        }
                    ],
                    cityName: [
                        {
                            required: true,
                            message: "City is required",
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
                    this.props.close(res.data);
                });
            } else if (this.state.mode === 'edit') {
                updateAddress(this.state.addressData).then(res => {
                    this.props.close(res.data);
                });
            }
        });
    };

    render() {
        return (
            <Dialog
                visible={this.props.visible}
                title={this.state.mode === 'add' ? "Add Address" : "Edit Address"}
                onCancel={() => this.props.close(null)}>
                <Dialog.Body>
                    <Form ref="addressForm"
                          labelPosition="top" labelWidth="100"
                          model={this.state.addressData} rules={this.state.form.rules}>
                        <Layout.Row gutter="20">
                            <Layout.Col span="12">
                                <Form.Item
                                    label="Contact"
                                    prop="contactName">
                                    <Input
                                        value={this.state.addressData.contactName}
                                        onChange={this.onChangeInput('contactName')}/>
                                </Form.Item>
                            </Layout.Col>
                            <Layout.Col span="12">
                                <Form.Item
                                    label="State/Province"
                                    prop="stateProvince">
                                    <Input
                                        value={this.state.addressData.stateProvince}
                                        onChange={this.onChangeInput('stateProvince')}/>
                                </Form.Item>
                            </Layout.Col>

                            <Layout.Col span="12">
                                <Form.Item
                                    label="Company"
                                    prop="company">
                                    <Input
                                        value={this.state.addressData.company}
                                        onChange={this.onChangeInput('company')}/>
                                </Form.Item>
                            </Layout.Col>
                            <Layout.Col span="12">
                                <Form.Item
                                    label="Postal Code"
                                    prop="postalCode">
                                    <Input
                                        value={this.state.addressData.postalCode}
                                        onChange={this.onChangeInput('postalCode')}/>
                                </Form.Item>
                            </Layout.Col>

                            <Layout.Col span="12">
                                <Form.Item
                                    label="Address"
                                    prop="address1">
                                    <Input
                                        value={this.state.addressData.address1}
                                        onChange={this.onChangeInput('address1')}/>
                                </Form.Item>
                            </Layout.Col>
                            <Layout.Col span="12">
                                <Form.Item
                                    label="Address 2"
                                    prop="address2">
                                    <Input
                                        value={this.state.addressData.address2}
                                        onChange={this.onChangeInput('address2')}/>
                                </Form.Item>
                            </Layout.Col>

                            <Layout.Col span="12">
                                <Form.Item
                                    label="Phone"
                                    prop="phoneNumber">
                                    <Input
                                        value={this.state.addressData.phoneNumber}
                                        onChange={this.onChangeInput('phoneNumber')}/>
                                </Form.Item>
                            </Layout.Col>
                            <Layout.Col span="12">
                                <Form.Item
                                    label="Email"
                                    prop="email">
                                    <Input
                                        value={this.state.addressData.email}
                                        onChange={this.onChangeInput('email')}/>
                                </Form.Item>
                            </Layout.Col>

                            <Layout.Col span="12">
                                <Form.Item
                                    label="Country"
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
                                    label="City"
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
                    <Button onClick={() => this.props.close(null)}>Cancel</Button>
                    <Button onClick={this.saveAddress} type="primary" >Save</Button>
                </Dialog.Footer>
            </Dialog>
        );
    }
}

export default AddEditAddressBook;
