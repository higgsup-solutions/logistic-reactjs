import React, {Component} from 'react';
import FooterItem from "./footer-item";

class FooterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
    }


    render() {
        return (
            <div className="footer">
                <div className="footer-row-1">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-4">
                                <h4 className="text-uppercase text-left title">head office</h4>
                                <div className="footer-item">
                                    <FooterItem text="72 Tran Dang Ninh Street - Cau Giay District - HN" icon="fa-map-marker"/>
                                    <FooterItem text="(+84)09 4242 69999" icon="fa-phone"/>
                                    <FooterItem text="higgsup@gmail.com" icon="fa-envelope"/>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-4">
                                <h4 className="text-uppercase text-left title">satellite office</h4>
                                <div className="footer-item">
                                    <FooterItem text="72 Tran Dang Ninh Street - Cau Giay District - HN" icon="fa-map-marker"/>
                                    <FooterItem text="(+84)09 4242 69999" icon="fa-phone"/>
                                    <FooterItem text="higgsup@gmail.com" icon="fa-envelope"/>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-4">
                                <h4 className="text-uppercase text-left title">palm shipping agency</h4>
                                <div className="footer-item">
                                    <FooterItem text="72 Tran Dang Ninh Street - Cau Giay District - HN" icon="fa-map-marker"/>
                                    <FooterItem text="(+84)09 4242 69999" icon="fa-phone"/>
                                    <FooterItem text="higgsup@gmail.com" icon="fa-envelope"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-row-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-3">
                                <p>Ut enim ad minim veriam, quis nostrud cution ullamco laboris nisi ut aliquip</p>
                                <h5>Working Hours</h5>
                                <p>Monday - Friday : 8AM - 6PM</p>
                                <p>Monday - Friday : 8AM - 6PM</p>
                            </div>
                            <div className="col-xs-12 col-sm-3">
                                <p>Ut enim ad minim veriam, quis nostrud cution ullamco laboris nisi ut aliquip</p>
                                <h5>Working Hours</h5>
                                <p>Monday - Friday : 8AM - 6PM</p>
                                <p>Monday - Friday : 8AM - 6PM</p>
                            </div>
                            <div className="col-xs-12 col-sm-3">
                                <p>Ut enim ad minim veriam, quis nostrud cution ullamco laboris nisi ut aliquip</p>
                                <h5>Working Hours</h5>
                                <p>Monday - Friday : 8AM - 6PM</p>
                                <p>Monday - Friday : 8AM - 6PM</p>
                            </div>
                            <div className="col-xs-12 col-sm-3">
                                <p>Ut enim ad minim veriam, quis nostrud cution ullamco laboris nisi ut aliquip</p>
                                <h5>Working Hours</h5>
                                <p>Monday - Friday : 8AM - 6PM</p>
                                <p>Monday - Friday : 8AM - 6PM</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-row-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 text-left">
                                @Designed by Higgsup
                            </div>
                            <div className="col-xs-12 col-sm-6 text-right">
                                <i className="fa fa-facebook-square mr-2"></i>
                                <i className="fa fa-facebook-square mr-2"></i>
                                <i className="fa fa-facebook-square mr-2"></i>
                                <i className="fa fa-facebook-square"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FooterComponent;
