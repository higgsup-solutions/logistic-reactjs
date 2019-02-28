import React, {Component} from 'react';
import {Button, Card, Form, Input, Layout, Pagination, Table} from 'element-react';
import './address-book.scss';
import {getAddressBook} from "../../integrate/address-book";
import {FormattedMessage, injectIntl} from "react-intl";
import AddEditAddressBook from "./add-edit-address-book.component";
import RemoveAddressBook from "./remove-address-book.component";

class AddressBook extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchForm: {
                searchTerm: '',
            },

            columns: [
                {
                    label: this.props.intl.formatMessage({id: 'ab.contactName'}),
                    prop: "contactName",
                },
                {
                    label: this.props.intl.formatMessage({id: 'ab.company'}),
                    prop: "company",
                },
                {
                    label: this.props.intl.formatMessage({id: 'ab.address1'}),
                    prop: "address1"
                },
                {
                    label: this.props.intl.formatMessage({id: 'ab.address2'}),
                    prop: "address2"
                },
                {
                    label: this.props.intl.formatMessage({id: 'ab.cityName'}),
                    prop: "cityName"
                },
                {
                    label: this.props.intl.formatMessage({id: 'ab.stateProvince'}),
                    prop: "stateProvince"
                },
                {
                    label: this.props.intl.formatMessage({id: 'ab.postalCode'}),
                    prop: "postalCode"
                },
                {
                    label: this.props.intl.formatMessage({id: 'ab.countryName'}),
                    prop: "countryName"
                },
                {
                    label: this.props.intl.formatMessage({id: 'ab.phoneNumber'}),
                    prop: "phoneNumber"
                }
            ],

            addressBook: [],
            filteredAddressBook: [],
            pagination: {
                pageSize: 10,
                currentPage: 1,
                data: []
            },

            addEditForm: {
                visible: false,
                mode: '' // 'add' or 'edit'
            },

            removeForm: {
                visible: false
            },

            selectedAddress: null
        }
    }

    componentDidMount() {
        getAddressBook().then(res => {
            this.setState(
                Object.assign({},
                    this.state,
                    {
                        addressBook: res.data,
                        filteredAddressBook: res.data
                    }
                ),
                () => this.goToPage(1)
            );
        });
    }

    search = e => {
        e.preventDefault();

        let filteredAddressBook = this.state.addressBook.filter(item => this.isItemMatchingFilter(item));
        this.setState(
            Object.assign({},
                this.state,
                {filteredAddressBook: filteredAddressBook}),
            () => this.goToPage(1)
        );
    };

    isItemMatchingFilter(item) {
        let searchTermLowercase = this.state.searchForm.searchTerm.toLowerCase();
        return (item.contactName != null && item.contactName.toLowerCase().includes(searchTermLowercase)) ||
            (item.company != null && item.company.toLowerCase().includes(searchTermLowercase)) ||
            (item.address1 != null && item.address1.toLowerCase().includes(searchTermLowercase)) ||
            (item.address2 != null && item.address2.toLowerCase().includes(searchTermLowercase)) ||
            (item.cityName != null && item.cityName.toLowerCase().includes(searchTermLowercase)) ||
            (item.stateProvince != null && item.stateProvince.toLowerCase().includes(searchTermLowercase)) ||
            (item.postalCode != null && item.postalCode.toLowerCase().includes(searchTermLowercase)) ||
            (item.countryName != null && item.countryName.toLowerCase().includes(searchTermLowercase)) ||
            (item.phoneNumber != null && item.phoneNumber.toLowerCase().includes(searchTermLowercase));
    }

    goToPage = pageIndex => {
        let start = (pageIndex - 1) * this.state.pagination.pageSize;
        let end = start + this.state.pagination.pageSize;
        let pageData = this.state.filteredAddressBook.slice(start, end);

        let newPage = Object.assign({},
            this.state.pagination,
            {currentPage: pageIndex, data: pageData});

        this.setState(
            Object.assign({}, this.state, {pagination: newPage})
        );
    };

    onChangeInput = e => {
        this.setState(
            Object.assign({}, this.state, {searchForm: {searchTerm: e}})
        );
    };

    changeSelectedAddress = (newAddress) => {
        this.setState(
            Object.assign({}, this.state, {selectedAddress: newAddress})
        );
    };

    openAddEditForm = (mode) => {
        this.setState(
            Object.assign({},
                this.state,
                {
                    addEditForm: {
                        visible: true,
                        mode: mode
                    }
                })
        );
    };

    closeAddEditForm = () => {
        this.setState(
            Object.assign({},
                this.state,
                {
                    addEditForm: {
                        visible: false,
                        mode: ''
                    }
                })
        );
    };

    submitAddEditForm = (addressData) => {
        let newAddressBook = [];
        if (this.state.addEditForm.mode === 'add') {
            newAddressBook = this.state.addressBook.slice();
            newAddressBook.push(addressData);
        } else if (this.state.addEditForm.mode === 'edit') {
            let oldAddressIndex = this.state.addressBook.findIndex(address => address.id === addressData.id);

            newAddressBook = this.state.addressBook.slice();
            newAddressBook.splice(oldAddressIndex, 1, addressData);
        }

        let newState = Object.assign({}, this.state, {
            addressBook: newAddressBook,
            searchForm: {
                searchTerm: '',
            },
            filteredAddressBook: newAddressBook,
            selectedAddress: null,
            addEditForm: {
                visible: false,
                mode: ''
            }
        });

        this.setState(newState, () => this.goToPage(1));
    };

    openRemoveForm = () => {
        this.setState(
            Object.assign({},
                this.state,
                {
                    removeForm: {
                        visible: true
                    }
                })
        );
    };

    closeRemoveForm = () => {
        this.setState(
            Object.assign({},
                this.state,
                {
                    removeForm: {
                        visible: false
                    }
                })
        );
    };

    submitRemoveForm = () => {
        let removedAddressId = this.state.selectedAddress.id;

        let removedIndex = this.state.addressBook.findIndex(address => address.id === removedAddressId);
        let newAddressBook = this.state.addressBook.slice();
        newAddressBook.splice(removedIndex, 1);

        removedIndex = this.state.filteredAddressBook.findIndex(address => address.id === removedAddressId);
        let newFilteredAddressBook = this.state.filteredAddressBook.slice();
        newFilteredAddressBook.splice(removedIndex, 1);

        let newState = Object.assign({}, this.state, {
            addressBook: newAddressBook,
            filteredAddressBook: newFilteredAddressBook,
            selectedAddress: null,
            removeForm: {
                visible: false
            }
        });

        this.setState(newState, () => this.goToPage(1));
    };

    render() {
        return (
            <div className="address-book">
                <Card
                    className="mycard"
                    header={
                        <div className="clearfix pl-3">
                            <span><FormattedMessage id="ab.title"/></span>
                        </div>
                    }
                >
                    <Form inline={true} model={this.state.searchForm} onSubmit={this.search}>
                        <Form.Item>
                            <Input
                                className="search-address-input"
                                value={this.state.searchForm.searchTerm}
                                placeholder={this.props.intl.formatMessage({id: 'ab.searchInput.placeHolder'})}
                                onChange={this.onChangeInput}
                                append={
                                    <Button nativeType="submit" type="primary" icon="search"/>
                                }/>
                        </Form.Item>
                    </Form>

                    <Table
                        emptyText={this.props.intl.formatMessage({id: 'emptyData'})}
                        columns={this.state.columns}
                        data={this.state.pagination.data}
                        highlightCurrentRow={true}
                        onCurrentChange={this.changeSelectedAddress}
                    />

                    <Layout.Row>
                        <Layout.Col span="12">
                            <div className="pt-3">
                                <Button
                                    className="action-button"
                                    type="primary" size="small"
                                    onClick={() => this.openAddEditForm('add')}>Add</Button>

                                <Button
                                    className="action-button"
                                    type="primary" size="small"
                                    disabled={!this.state.selectedAddress}
                                    onClick={() => this.openAddEditForm('edit')}>Edit</Button>

                                <Button
                                    className="action-button"
                                    type="primary" size="small"
                                    disabled={!this.state.selectedAddress}
                                    onClick={this.openRemoveForm}>Remove</Button>
                            </div>
                        </Layout.Col>

                        <Layout.Col span="12">
                            <Pagination
                                className="text-right pr-0 pt-3"
                                layout="prev, pager, next"
                                pageSize={this.state.pagination.pageSize}
                                currentPage={this.state.pagination.currentPage}
                                total={this.state.filteredAddressBook.length}
                                onCurrentChange={this.goToPage}/>
                        </Layout.Col>
                    </Layout.Row>
                </Card>

                {
                    this.state.addEditForm.visible ?
                        <AddEditAddressBook
                            visible={this.state.addEditForm.visible}
                            mode={this.state.addEditForm.mode}
                            addressData={this.state.addEditForm.mode === 'add' ? null : this.state.selectedAddress}
                            onCancel={this.closeAddEditForm}
                            onSubmit={this.submitAddEditForm}/> : ''
                }

                {
                    this.state.removeForm.visible ?
                        <RemoveAddressBook
                            visible={this.state.removeForm.visible}
                            addressData={this.state.selectedAddress}
                            onCancel={this.closeRemoveForm}
                            onSubmit={this.submitRemoveForm} /> : ''
                }
            </div>
        );
    }
}

export default injectIntl(AddressBook);
