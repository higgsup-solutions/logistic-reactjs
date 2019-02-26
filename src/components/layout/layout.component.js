import React, {Component} from 'react';
import './layout.scss';
import Header from "../share/header.component";
import FooterComponent from "../share/footer.component";
import {BOOKING} from "../../App.url";
import Booking from "../booking/booking.component";
import UserInfoStorage from "../../utils/user-info";

class LayoutComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header pathname={this.props.location.pathname}/>
                <span className="float-right login-name">
                    Login as <span className="text-info">{UserInfoStorage.getUserEmail()}</span>
                </span>
                <div className="layout-content">
                    {this.props.children}
                </div>
                <FooterComponent/>
            </div>
        );
    }
}

export default LayoutComponent;
