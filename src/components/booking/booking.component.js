import React, { Component } from "react";
import './booking.scss';
import SenderAddress from "./sender-address";
import {Button, Layout} from 'element-react';
import {FormattedMessage, injectIntl} from "react-intl";
import PackageShipment from "./package-shipment";

class Booking extends Component {
    constructor(props) {
        super(props);
    }

    onContinueBooking = (e) => {

    };

    onQuote = (e) => {

    };

    render() {

        return (
            <div className="booking">
                <Layout.Row>
                    <Layout.Col span="12">
                        <SenderAddress name={this.props.intl.formatMessage({id: 'booking.senderAddress'})}/>
                        <SenderAddress name={this.props.intl.formatMessage({id: 'booking.recipientAddress'})}/>
                    </Layout.Col>
                    <Layout.Col span="12">
                        <PackageShipment/>
                        <div className="text-right pr-3">
                            <Button type="primary" onClick={this.onQuote}>Quote</Button>
                            <Button type="primary" onClick={this.onContinueBooking}>Continue Booking</Button>
                        </div>
                    </Layout.Col>
                </Layout.Row>
            </div>
        );
    }
}

export default injectIntl(Booking);
