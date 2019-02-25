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
                <Header pathname={this.props.location.pathname}/>
                {this.props.children}
                <FooterComponent/>
            </div>
        );
    }
}

export default LayoutComponent;
