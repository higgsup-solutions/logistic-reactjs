import React, {Component} from "react";
import {Select, Table, Pagination} from "element-react";
import {injectIntl} from "react-intl";

class BookingList extends Component {

    pageSizeList = [
        {
            value: '25',
            label: '25'
        }, {
            value: '50',
            label: '50'
        }, {
            value: '100',
            label: '100'
        }
    ];

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
            prop: "quoted",
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
            width: 150
        },
    ];

    fakeData = [
        {
            carierName: 'DHL Domestic',
            senderContactName: 'DHL Domestic Express',
            trackingNo: '2131234125',
            pieces: '1',
            actualWeight: '1.0kg(s)',
            quoted: '12.68',
            destCountry: 'VietNam',
            shippingDate: '2016-05-03',
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
        },
        {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
        }, {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
        }
    ];

    constructor(props) {
        super(props);

        this.state = {
            pageSize: '25',
            data: this.fakeData
        }
    }

    onChangePageSize(item) {
        this.setState({
            pageSize: item
        });
    };

    render() {
        return (
            <div className="booking-list">
                {/*<div className="page-size-container text-left">*/}
                    {/*Show*/}
                    {/*<Select value={this.state.pageSize}*/}
                            {/*size="small"*/}
                            {/*onChange={this.onChangePageSize.bind(this)}*/}
                            {/*className="page-size-select">*/}
                        {/*{*/}
                            {/*this.pageSizeList.map(el => {*/}
                                {/*return <Select.Option key={el.value}*/}
                                                      {/*label={el.label}*/}
                                                      {/*value={el.value}/>*/}
                            {/*})*/}
                        {/*}*/}
                    {/*</Select>*/}
                    {/*entries*/}
                {/*</div>*/}
                <div className="booking-table">
                    <Table
                        style={{width: '100%'}}
                        columns={this.columns}
                        data={this.state.data}
                        border={true}
                        highlightCurrentRow={true}
                        onRowClick={item => this.props.onClickShipment(item)}
                        // onCurrentChange={item => console.log(item)}
                    />
                </div>
                <div className="pageable-container text-right">
                    <Pagination layout="prev, pager, next"
                                total={this.state.data.size}/>
                </div>
            </div>
        )
    }
}

export default injectIntl(BookingList);

