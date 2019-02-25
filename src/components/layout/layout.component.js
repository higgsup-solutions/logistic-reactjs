import React, {Component} from 'react';
import './layout.scss';
import Header from "../share/header.component";
import FooterComponent from "../share/footer.component";
import {BOOKING} from "../../App.url";
import Booking from "../booking/booking.component";

class LayoutComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="layout-content">
                    {this.props.children}
                </div>
                <FooterComponent/>
            </div>
        );
    }
}

export default LayoutComponent;
