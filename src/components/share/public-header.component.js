import React, {Component} from 'react';
import './share.scss';
import {Menu} from "element-react";
import {navigate} from '@reach/router';
import {FormattedMessage, injectIntl} from "react-intl";
import {LOGIN, REGISTER} from "../../App.url";
import logo from './../../assets/logo.png';

class PublicHeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'en',
            menu: [
                {index: '1', url: LOGIN, label: 'menu.login'},
                {index: '2', url: REGISTER, label: 'menu.register'},
            ],
            activeLink: '1'
        };
    }

    componentWillMount() {
        this.state.menu.forEach(item => {
            if(item.url == this.props.pathname) {
                let newState = this.state;
                newState.activeLink = item.index;
                this.setState(newState);
            }
        });
    }

    onSelect(e) {
        let newState = this.state;
        for(let i = 0 ; i < this.state.menu.length; i++) {
            if( this.state.menu[i].index == e) {
                navigate(`${this.state.menu[i].url}`);
                newState.activeLink = e;
                break;
            }
        }
        this.setState(newState);
    }

    render() {
        return (
            <div className="public-header">
                <img src={logo} alt="logo" className="logo" />
                <Menu theme="dark" defaultActive={this.state.activeLink}
                      className="el-menu-demo"
                      mode="horizontal"
                      onSelect={this.onSelect.bind(this)}>
                    {this.state.menu.map(item => <Menu.Item className="float-right" key={item.index} index={item.index}><FormattedMessage id={item.label}/></Menu.Item>)}
                </Menu>
            </div>
        );
    }
}

export default injectIntl(PublicHeaderComponent);
