import React, {Component} from "react";
import './booking-history.scss';
import {Layout, Card} from 'element-react';
import BookingList from "./booking-list";
import {FormattedMessage, injectIntl} from "react-intl";
import ShipmentDetail from "./shipment-detail";

class BookingHistory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dialogVisible: false,
            selectedItem: null
        };
    }

    openShipmentDetailDialog(item) {
        this.setState({
            selectedItem: item,
            isClickItem: true
        })
    }

    onCloseShipmentDetails() {
        this.setState({
            selectedItem: {},
            isClickItem: false
        });
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
                                <Layout.Col span="24">
                                    <BookingList onClickShipment={this.openShipmentDetailDialog.bind(this)}/>
                                </Layout.Col>
                            </Layout.Row>
                        </Card>
                    </Layout.Col>
                </Layout.Row>

                {/*show shipment detail*/}
                <ShipmentDetail
                    data={this.state.selectedItem}
                    isClickItem={this.state.isClickItem}
                    onCloseShipmentDetails={this.onCloseShipmentDetails.bind(this)}
                />
            </div>
        );
    }
}

export default injectIntl(BookingHistory);
