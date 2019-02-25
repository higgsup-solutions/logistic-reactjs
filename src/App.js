import React, {Component} from 'react';
import './App.scss';
import LayoutComponent from "./components/layout/layout.component";
import { Router, Redirect } from "@reach/router";
import LoginComponent from "./components/login/login.component";
import PrivateRoute from "./components/private-route/private-route";
import {Select, i18n} from 'element-react';
import 'element-theme-default';
import locale from 'element-react/src/locale/lang/en';
import { injectIntl } from 'react-intl';
import PublicLayoutComponent from "./components/layout/public-layout.component";
import RegisterComponent from "./components/register/register.component";
import Booking from "./components/booking/booking.component";
import BookingHistory from "./components/booking-history/booking-history.component";
import NotFound from "./components/notfound/notfound.component";
import {ROLE_ADMIN, ROLE_MANAGER} from "./App.constant";
import {BOOKING, BOOKING_HISTORY, LOGIN_URL, PUBLIC, REGISTER_URL, LOGIN} from "./App.url";
import Authorization from "./components/authorizaton/authorization";
import 'font-awesome/css/font-awesome.min.css';

i18n.use(locale);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'en'
        }
    }

    onChangeLanguage = (e) => {
        this.props.changeLanguage(e);
    };

    render() {
        return (
            <div className="App">
                <Select value={this.state.language}
                        onChange={this.onChangeLanguage}
                        className="language-block z-index-9 mr-2">
                    <Select.Option label="English" value="en"></Select.Option>
                    <Select.Option label="Vietnamese" value="vn"></Select.Option>
                </Select>
                <Router>
                    <PrivateRoute component={LayoutComponent} path="/" >
                        <Redirect exact from="/" to={BOOKING} noThrow />
                        <Booking path={BOOKING}/>
                        <BookingHistory path={BOOKING_HISTORY} />
                        <NotFound default />
                    </PrivateRoute>
                    <PublicLayoutComponent path={PUBLIC}>
                        <Redirect from="/" to={LOGIN} noThrow />
                        <LoginComponent path={LOGIN_URL} />
                        <RegisterComponent path={REGISTER_URL} />
                        <NotFound default />
                    </PublicLayoutComponent>
                </Router>
            </div>
        );
    }
}

export default injectIntl(App);
