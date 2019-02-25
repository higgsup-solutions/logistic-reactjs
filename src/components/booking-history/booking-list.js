import React, {Component} from "react";
import {Button, Input, Layout, Pagination, Table} from "element-react";
import {FormattedMessage, injectIntl} from "react-intl";
import {getBookingHistory} from "../../integrate/booking-history";
import dateUtil from '../../utils/datetime'

class BookingList extends Component {

    columns = [
        {
            label: this.props.intl.formatMessage({id: 'carrier'}).toUpperCase(),
            prop: "carierName",
        },
        {
            label: this.props.intl.formatMessage({id: 'history.contactNameSender'}).toUpperCase(),
            prop: "senderContactName",
        },
        {
            label: `${this.props.intl.formatMessage({id: 'history.tracking'})}#`.toUpperCase(),
            prop: "trackingNo",
            width: 250
        },
        {
            label: this.props.intl.formatMessage({id: 'history.pieces'}).toUpperCase(),
            prop: "pieces",
            width: 120
        },
        {
            label: this.props.intl.formatMessage({id: 'history.weight'}).toUpperCase(),
            prop: "actualWeight",
            width: 150
        },
        {
            label: this.props.intl.formatMessage({id: 'history.quoted'}).toUpperCase(),
            prop: "totalCharge",
            width: 150
        },
        {
            label: this.props.intl.formatMessage({id: 'history.destCountry'}).toUpperCase(),
            prop: "destCountry",
            width: 250
        },
        {
            label: this.props.intl.formatMessage({id: 'history.shipDate'}).toUpperCase(),
            prop: "shippingDate",
            render: (row, column, index) => {
                const shipDate = row.shippingDate;
                return shipDate ? dateUtil.dateFormat.ddmmyyyyMinus(shipDate) : '-'
            },
            width: 150
        },
    ];

    constructor(props) {
        super(props);

        this.state = {
            textSearch: '',
            pageSize: 20,
            pageIndex: 0,
            totalItem: 0,
            data: []
        }
    }

    componentWillMount() {
        this.getBookingHistory()
    }

    getBookingHistory(newPage) {
        getBookingHistory(
            newPage || this.state.pageIndex,
            this.state.pageSize,
            this.state.textSearch
        ).then(res => {
            if (res.responseMessage && res.responseMessage.status === 'OK') {
                const {pageIndex, pageSize, totalItem} = res;
                const data = res.responseMessage.data || [];
                this.setState({
                    pageSize,
                    pageIndex,
                    totalItem,
                    data
                })
            }
        })
    }

    render() {
        return (
            <div className="booking-list">

                <Layout.Row>
                    <Layout.Col span="4">
                        <Input className="search-input"
                               value={this.state.textSearch}
                               placeholder={`${this.props.intl.formatMessage({id: 'search'})}`}
                               onChange={(value) => {this.state.textSearch = value; this.forceUpdate()} }
                        />
                    </Layout.Col>
                    <Button type="primary" onClick={this.getBookingHistory.bind(this, undefined)}>
                        <FormattedMessage id='search'/>
                    </Button>
                </Layout.Row>

                <div className="booking-table">
                    <Table
                        style={{width: '100%'}}
                        columns={this.columns}
                        data={this.state.data}
                        border={true}
                        highlightCurrentRow={true}
                        onRowClick={(item) => {this.props.onClickShipment(item)}}
                        emptyText={this.props.intl.formatMessage({id: 'history.empty'})}
                    />
                </div>
                <div className="pageable-container text-right">
                    <Pagination layout="prev, pager, next"
                                currentPage={this.state.pageIndex + 1}
                                pageSize={this.state.pageSize}
                                total={this.state.totalItem}
                                onCurrentChange={newCurrentPage => this.getBookingHistory(newCurrentPage - 1)}
                    />
                </div>
            </div>
        )
    }
}

export default injectIntl(BookingList);

