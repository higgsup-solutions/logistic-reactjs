import React, {Component} from 'react'
import {FormattedMessage, injectIntl} from "react-intl";
import {Button, Card, Notification} from "element-react";
import {getAddressBook, updateAddress} from "../../integrate/address-book";
import Autocomplete from 'react-autocomplete';

class AddressDefaultSettings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            type: props.type,
            oldDefaultAddress: {},
            findCompany: '',
            findContact: '',
            findAddress: {
                address1: "",
                address2: "",
                cityName: "",
                company: "",
                contactName: "",
                countryId: 0,
                countryName: "",
                email: null,
                id: null,
                phoneNumber: "",
                postalCode: null,
                receipientDefault: false,
                senderDefault: true,
                stateProvince: null
            },
            addressList: [],
        }
    }

    onChangeInput = (fieldName) => (e) => {
        let newState = {...this.state};
        newState[fieldName] = e.target.value;
        this.setState(newState);
    };

    resetFind() {
        this.setState({
            findAddress: this.state.oldDefaultAddress
        })
    }

    isSelectedNewAddress = () => {
        return JSON.stringify(this.state.oldDefaultAddress) === JSON.stringify(this.state.findAddress)
    };

    saveDefaultAddress() {
        let {findAddress, oldDefaultAddress} = this.state;
        const keyFinding = this.state.type === 'from' ? 'senderDefault' : 'receipientDefault';

        // Update status of address
        findAddress[keyFinding] = true;
        oldDefaultAddress[keyFinding] = false;

        // Create promises for updating both 2 addresses
        let promises = [updateAddress(findAddress)];
        // In case: Have not haven Address before updating
        if (oldDefaultAddress.id) promises.push(updateAddress(oldDefaultAddress));

        // Call API
        Promise.all(promises).then(responses => {
            let hasError = false;
            let messageCode = '';
            responses.forEach(res => {
                if (res.status !== 'OK') {
                    hasError = true;
                    messageCode = res.messageCode;
                }
            });
            if (hasError) {
                Notification.error({
                    title: 'Error',
                    message: messageCode
                });
            } else {
                this.fetchDataFromServer();
                Notification.info({
                    title: 'Success',
                    message: this.props.intl.formatMessage({id: 'settings.defaultAddress.updateAddressSuccess'})
                });
            }
        })
    }

    componentWillMount() {
        this.fetchDataFromServer();
    }

    fetchDataFromServer = () => {
        getAddressBook().then(res => {
            const data = res.data.map(item => {
                return {
                    ...item,
                    id: `${item.id}`
                }
            });

            const oldAdd = this.filterDefaultAddress(data);
            this.setState({
                addressList: data || [],
                findAddress: oldAdd,
                oldDefaultAddress: oldAdd
            });

        });
    };

    filterDefaultAddress = (data) => {
        const keyFinding = this.state.type === 'from' ? 'senderDefault' : 'receipientDefault';
        return data.find(item => item[keyFinding]) || {};
    };

    shouldItemRenderCompany = (item, value) => {
        return item.company.toLowerCase().indexOf(value.toLowerCase()) > -1;
    };
    shouldItemRenderContact = (item, value) => {
        return item.company.toLowerCase().indexOf(value.toLowerCase()) > -1;
    };
    renderMenuCompany = (children) => {
        return <div className="dropdown-autocomplete">{children}</div>;
    };
    onSelectCompany = (id) => {
        const address = this.state.addressList.find(item => item.id === id);
        this.setState({
            findAddress: address
        })
    };
    renderItemDropdownCompany = (item, isHighlighted) => {
        return <div className={`item-dropdown ${isHighlighted ? 'item-dropdown--highlighted' : ''}`} key={item.id}>
            <div className="item-icon">{item.contactName} <i className="fa fa-user"/></div>
            <div className="item-icon">{item.company} <i className="fa fa-building"/></div>
            <div className="item-icon">{item.address1} <i className="fa fa-map-marker"/></div>
            <div>{item.address2}</div>
            <div>{item.cityName} - {item.postalCode}</div>
            <div>{item.countryName}</div>
        </div>
    };

    render() {
        const wrapStyleAutocomplete = {
            position: 'relative',
            display: 'inline-block'
        };


        return (
            <Card className="mycard default-address-card mb-4"
                  header={
                      <div className="clearfix"
                           style={{paddingLeft: '1em'}}>
                          {
                              this.state.type === 'from' ?
                              <FormattedMessage id='settings.defaultAddress.from'/> :
                              <FormattedMessage id='settings.defaultAddress.to'/>
                          }

                      </div>
                  }>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <div className="label">
                            <FormattedMessage
                                id='settings.defaultAddress.findCompany'/>:
                        </div>

                        <div className="autocomplete-wrap">
                            <Autocomplete
                                value={this.state.findCompany}
                                inputProps={{
                                    id: 'company-autocomplete',
                                    // className: this.checkErrorField('company')
                                }}
                                wrapperStyle={wrapStyleAutocomplete}
                                items={this.state.addressList}
                                getItemValue={item => item.id + ''}
                                shouldItemRender={this.shouldItemRenderCompany}
                                onChange={this.onChangeInput('findCompany')}
                                onSelect={this.onSelectCompany}
                                renderMenu={this.renderMenuCompany}
                                renderItem={this.renderItemDropdownCompany}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="label">
                            <FormattedMessage
                                id='settings.defaultAddress.findContact'/>:
                        </div>
                        <div className="autocomplete-wrap">
                            <Autocomplete
                                value={this.state.findContact}
                                inputProps={{
                                    id: 'contact-autocomplete',
                                    // className: this.checkErrorField('company')
                                }}
                                wrapperStyle={wrapStyleAutocomplete}
                                items={this.state.addressList}
                                getItemValue={item => item.id + ''}
                                shouldItemRender={this.shouldItemRenderContact}
                                onChange={this.onChangeInput('findContact')}
                                onSelect={this.onSelectCompany}
                                renderMenu={this.renderMenuCompany}
                                renderItem={this.renderItemDropdownCompany}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8 pl-4">
                        <div className="address-line">{this.state.findAddress.contactName || '-'}</div>
                        <div className="address-line">{this.state.findAddress.company || '-'}</div>
                        <div className="address-line">{this.state.findAddress.address1 || '-'}</div>
                        <div className="address-line">{this.state.findAddress.address2 || '-'}</div>
                        <div className="address-line">{this.state.findAddress.cityName || '-'} {this.state.findAddress.postalCode}</div>
                        <div className="address-line">{this.state.findAddress.countryName || '-'}</div>
                    </div>
                    <div className="col-md-4 text-right">
                        <Button type="primary"
                                disabled={this.isSelectedNewAddress()}
                                onClick={this.resetFind.bind(this)}>
                            <FormattedMessage id='reset'/>
                        </Button>
                        <Button type="primary"
                                disabled={this.isSelectedNewAddress()}
                                onClick={this.saveDefaultAddress.bind(this)}>
                            <FormattedMessage id='save'/>
                        </Button>
                    </div>
                </div>
            </Card>
        )
    }

}

export default injectIntl(AddressDefaultSettings);
