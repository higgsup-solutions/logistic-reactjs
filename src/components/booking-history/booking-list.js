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
            prop: "carrier",
        },
        {
            label: this.props.intl.formatMessage({id: 'history.voided'}).toUpperCase(),
            prop: "voided",
            width: 100
        },
        {
            label: `${this.props.intl.formatMessage({id: 'history.tracking'})}#`.toUpperCase(),
            prop: "tracking",
            width: 120
        },
        {
            label: this.props.intl.formatMessage({id: 'date'}).toUpperCase(),
            prop: "date",
            width: 120
        },
        {
            label: this.props.intl.formatMessage({id: 'history.timestamp'}).toUpperCase(),
            prop: "timestamp",
            width: 120
        },
        {
            label: this.props.intl.formatMessage({id: 'history.shipDate'}).toUpperCase(),
            prop: "shipDate",
            width: 120
        },
        {
            label: this.props.intl.formatMessage({id: 'history.pieces'}).toUpperCase(),
            prop: "pieces",
            width: 100
        },
        {
            label: this.props.intl.formatMessage({id: 'history.service'}).toUpperCase(),
            prop: "service",
        },
        {
            label: this.props.intl.formatMessage({id: 'history.weight'}).toUpperCase(),
            prop: "weight",
            width: 100
        },
        {
            label: this.props.intl.formatMessage({id: 'history.quoted'}).toUpperCase(),
            prop: "quoted",
            width: 100
        },
        {
            label: this.props.intl.formatMessage({id: 'history.scheduled'}).toUpperCase(),
            prop: "scheduled",
            width: 120
        },
        {
            label: this.props.intl.formatMessage({id: 'history.scheduleCollectionTimestamp'}).toUpperCase(),
            prop: "scheduleCollectionTimestamp",
        },
        {
            label: this.props.intl.formatMessage({id: 'history.collectionInfo'}).toUpperCase(),
            prop: "collectionInfo",
        },
        {
            label: this.props.intl.formatMessage({id: 'history.destination'}).toUpperCase(),
            prop: "destination",
        },
        {
            label: this.props.intl.formatMessage({id: 'history.destCountry'}).toUpperCase(),
            prop: "destCountry",
        },
    ];

    fakeData = [
        {
            carrier: 'DHL Domestic',
            voided: 'NO',
            tracking: '2131234125',
            date: '2016-05-03',
            timestamp: '13:23:22',
            shipDate: '2016-05-03',
            pieces: '1',
            service: 'DHL Domestic Express',
            weight: '1.0kg(s)',
            quoted: '12.68',
            scheduled: 'yes',
            scheduleCollectionTimestamp: '2016-05-03 00:00:11',
            collectionInfo: '234234',
            destination: 'Tran Dang Ninh',
            destCountry: 'VietNam'
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
                <div className="page-size-container text-left">
                    Show
                    <Select value={this.state.pageSize}
                            size="small"
                            onChange={this.onChangePageSize.bind(this)}
                            className="page-size-select">
                        {
                            this.pageSizeList.map(el => {
                                return <Select.Option key={el.value}
                                                      label={el.label}
                                                      value={el.value}/>
                            })
                        }
                    </Select>
                    entries
                </div>
                <div className="booking-table">
                    <Table
                        style={{width: '100%'}}
                        columns={this.columns}
                        data={this.state.data}
                        border={true}
                        highlightCurrentRow={true}
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

