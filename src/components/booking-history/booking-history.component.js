import React, {Component} from "react";
import './booking-history.scss';
import {Button, Layout, Select, Card} from 'element-react';
import BookingList from "./booking-list";
import {FormattedMessage, injectIntl} from "react-intl";
import SearchBooking from "./search-booking";

class BookingHistory extends Component {

    filterRangeSpecs = [
        {
            value: 'today',
            label: 'today'
        }, {
            value: 'last30Ds',
            label: 'last30Ds'
        }, {
            value: 'last60Ds',
            label: 'last60Ds'
        }, {
            value: 'last90Ds',
            label: 'last90Ds'
        }, {
            value: 'range',
            label: 'range'
        }, {
            value: 'all',
            label: 'all'
        }
    ];

    constructor(props) {
        super(props);

        this.state = {
            filterRange: 'all',
            dialogVisible: false,
            selectedItem: {}
        };
    }

    refreshFilter() {
        console.log('refresh')
    };

    search(form) {
        console.log(form)
    }

    render() {
        return (
            <div className="booking-history">
                <Layout.Row>
                    <Layout.Col span="24">
                        <Card className="history-card"
                              header={<div className="clearfix text-center">
                                  <FormattedMessage id='history.history'/>
                              </div>}>
                            <div className="text-left filter-range">
                                <Select value={this.state.filterRange}
                                        className="filter-range-select">
                                    {
                                        this.filterRangeSpecs.map(el => {
                                            return <Select.Option key={el.value}
                                                                  label={this.props.intl.formatMessage({id: `history.filterRange.${el.label}`})}
                                                                  value={el.value}/>
                                        })
                                    }
                                </Select>
                                <Button type="primary" onClick={this.refreshFilter.bind(this)}>
                                    <FormattedMessage id='history.refresh'/>
                                </Button>
                            </div>

                            <Layout.Row>
                                <SearchBooking onSearchClick={this.search}/>
                            </Layout.Row>

                            <Layout.Row>
                                <Layout.Col span="24">
                                    <BookingList/>
                                </Layout.Col>
                            </Layout.Row>
                        </Card>
                    </Layout.Col>
                </Layout.Row>

            </div>
        );
    }
}

export default injectIntl(BookingHistory);
