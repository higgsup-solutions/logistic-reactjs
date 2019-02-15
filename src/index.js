import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ENGLISH } from './i18n/en';
import { VIETNAMESE } from './i18n/vn';
import {IntlProvider} from 'react-intl';
import {Component} from 'react';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages : ENGLISH.messages
        };
    }

    onChangeLanguage = (lng) => {
        if(lng == 'en') {
            this.setState({messages: ENGLISH.messages});
        } else {
            this.setState({messages: VIETNAMESE.messages});
        }
    };

    render() {
        return (
            <IntlProvider locale='en' messages={this.state.messages}>
                <App changeLanguage={this.onChangeLanguage} />
            </IntlProvider>
        );
    }
}

ReactDOM.render(<Index/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
