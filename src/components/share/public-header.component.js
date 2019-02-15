import React, {Component} from 'react';
import './share.scss';
import {Menu} from "element-react";
import {navigate} from '@reach/router';
import {FormattedMessage, injectIntl} from "react-intl";
import {LOGIN, REGISTER} from "../../App.url";

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
            <div>
                <Menu theme="dark" defaultActive={this.state.activeLink} className="el-menu-demo" mode="horizontal"
                      onSelect={this.onSelect.bind(this)}>
                    {this.state.menu.map(item => <Menu.Item key={item.index} index={item.index}><FormattedMessage id={item.label}/></Menu.Item>)}
                </Menu>
            </div>
        );
    }
}

export default injectIntl(PublicHeaderComponent);
