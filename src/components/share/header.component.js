import React, {Component} from 'react';
import './share.scss';
import {Menu} from 'element-react';
import {navigate, Link} from '@reach/router';
import {BOOKING, BOOKING_HISTORY, LOGIN, SETTING} from "../../App.url";
import {FormattedMessage} from "react-intl";
import logo from "../../assets/logo.png";

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [
                {index: '1', url: BOOKING, label: 'menu.booking'},
                {index: '2', url: BOOKING_HISTORY, label: 'menu.bookingHistory'},
                {index: '3', url: SETTING, label: 'menu.setting'},
                {index: '4', url: SETTING, label: 'menu.supplies'},
                {index: '5', url: SETTING, label: 'menu.invoices'},
                {index: '6', url: SETTING, label: 'menu.help'},
            ],
            activeLink: '1'
        }
    }

    onLogout = (e) => {
        localStorage.clear();
    };

    onSelect = (e) => {
        let newState = this.state;
        for(let i = 0 ; i < this.state.menu.length; i++) {
            if( this.state.menu[i].index == e) {
                navigate(`${this.state.menu[i].url}`);
                newState.activeLink = e;
                break;
            }
        }
        this.setState(newState);
    };

    render() {
        return (
            <div className="public-header">
                <img src={logo} alt="logo" className="logo mr-3" />
                <Menu theme="dark" defaultActive={this.state.activeLink} className="el-menu-demo" mode="horizontal" onSelect={this.onSelect}>
                    {this.state.menu.map((item) =>
                        <Menu.Item key={item.index} index={item.index}><FormattedMessage id={item.label}/></Menu.Item>)}
                </Menu>
                <Link onClick={this.onLogout} className="logout" to={LOGIN}>Logout</Link>
            </div>
        );
    }
}

export default HeaderComponent;
