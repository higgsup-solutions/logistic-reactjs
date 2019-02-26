import React, {Component} from 'react';
import {Button, Card, Form, Input, Pagination, Table} from 'element-react';
import './address-book.scss';
import {getAddressBook} from "../../integrate/address-book";

class AddressBook extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchForm: {
                searchTerm: '',
            },

            columns: [
                {
                    label: "Contact",
                    prop: "contactName",
                },
                {
                    label: "Company",
                    prop: "company",
                },
                {
                    label: "Address",
                    prop: "address1"
                },
                {
                    label: "Address2",
                    prop: "address2"
                },
                {
                    label: "City",
                    prop: "cityName"
                },
                {
                    label: "State/Province",
                    prop: "stateProvince"
                },
                {
                    label: "Postal Code",
                    prop: "postalCode"
                },
                {
                    label: "Country",
                    prop: "countryName"
                },
                {
                    label: "Phone",
                    prop: "phoneNumber"
                }
            ],

            addressBook: [],
            filteredAddressBook: [],
            pagination: {
                pageSize: 10,
                currentPage: 1,
                data: []
            }
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
                () => {
                    this.goToPage(1);
                }
            );
        });
    }

    onSearch = e => {
        e.preventDefault();

        let searchTermLowercase = this.state.searchForm.searchTerm.toLowerCase();
        let filteredAddressBook = this.state.addressBook.filter(
            item => (item.contactName != null && item.contactName.toLowerCase().includes(searchTermLowercase)) ||
                (item.company != null && item.company.toLowerCase().includes(searchTermLowercase)) ||
                (item.address1 != null && item.address1.toLowerCase().includes(searchTermLowercase)) ||
                (item.address2 != null && item.address2.toLowerCase().includes(searchTermLowercase)) ||
                (item.cityName != null && item.cityName.toLowerCase().includes(searchTermLowercase)) ||
                (item.stateProvince != null && item.stateProvince.toLowerCase().includes(searchTermLowercase)) ||
                (item.postalCode != null && item.postalCode.toLowerCase().includes(searchTermLowercase)) ||
                (item.countryName != null && item.countryName.toLowerCase().includes(searchTermLowercase)) ||
                (item.phoneNumber != null && item.phoneNumber.toLowerCase().includes(searchTermLowercase))
        );

        this.setState(
            Object.assign({},
                this.state,
                { filteredAddressBook: filteredAddressBook }),
            () => {
            this.goToPage(1);
        });
    };

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

    render() {
        return (
            <Card
                className="mycard"
                header={
                    <div className="clearfix pl-3">
                        <span>Address Book</span>
                    </div>
                }
            >
                <Form inline={true} model={this.state.searchForm} onSubmit={this.onSearch}>
                    <Form.Item>
                        <Input
                            className="search-address-input"
                            value={this.state.searchForm.searchTerm}
                            placeholder="Search address book..."
                            onChange={this.onChangeInput}
                            append={
                                <Button nativeType="submit" type="primary" icon="search"/>
                            }/>
                    </Form.Item>
                </Form>

                <Table
                    columns={this.state.columns}
                    data={this.state.pagination.data}
                    stripe={true}
                />

                <Pagination
                    className="text-right pr-0 pt-3"
                    layout="prev, pager, next"
                    pageSize={this.state.pagination.pageSize}
                    currentPage={this.state.pagination.currentPage}
                    total={this.state.filteredAddressBook.length}
                    onCurrentChange={this.goToPage}/>
            </Card>
        );
    }
}

export default AddressBook;
