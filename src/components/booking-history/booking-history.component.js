import React, {Component} from "react";
import './booking-history.scss';
import {Button, Layout, Select, Card, Input} from 'element-react';
import BookingList from "./booking-list";
import {FormattedMessage, injectIntl} from "react-intl";
import ShipmentDetail from "./shipment-detail";

class BookingHistory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            dialogVisible: false,
            selectedItem: null
        };
    }

    refreshFilter() {
        console.log('refresh')
    };

    search(form) {
        console.log(form)
    }

    openShipmentDetailDialog(item) {
        this.setState({
            selectedItem: item,
            isClickItem: true
        })
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
                            <Layout.Row>
                                <Layout.Col span="4">
                                    <Input className="search-input"
                                           value={this.state.searchValue}
                                           placeholder={`${this.props.intl.formatMessage({id: 'search'})}`}
                                           onChange={(value) => this.setState({searchValue: value})}
                                    />
                                </Layout.Col>
                            </Layout.Row>

                            <Layout.Row>
                                <Layout.Col span="24">
                                    <BookingList onClickShipment={this.openShipmentDetailDialog.bind(this)}/>
                                </Layout.Col>
                            </Layout.Row>
                        </Card>
                    </Layout.Col>
                </Layout.Row>

                {/*show shipment detail*/}
                <ShipmentDetail data={this.state.selectedItem}
                                isClickItem={this.state.isClickItem}
                />
            </div>
        );
    }
}

export default injectIntl(BookingHistory);
