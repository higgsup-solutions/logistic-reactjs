import React, {Component} from 'react';
import './App.scss';
import LayoutComponent from "./components/layout/layout.component";
import {Redirect, Router} from "@reach/router";
import LoginComponent from "./components/login/login.component";
import PrivateRoute from "./components/private-route/private-route";
import {i18n, Select} from 'element-react';
import 'element-theme-default';
import locale from 'element-react/src/locale/lang/en';
import {injectIntl} from 'react-intl';
import PublicLayoutComponent from "./components/layout/public-layout.component";
import RegisterComponent from "./components/register/register.component";
import Booking from "./components/booking/booking.component";
import BookingHistory from "./components/booking-history/booking-history.component";
import NotFound from "./components/notfound/notfound.component";
import {ADDRESS_BOOK, BOOKING, BOOKING_HISTORY, LOGIN, LOGIN_URL, PUBLIC, REGISTER_URL, CONFIRM} from "./App.url";
import 'font-awesome/css/font-awesome.min.css';
import AddressBook from "./components/address-book/address-book.component";
import ConfirmComponent from "./components/confirm-page/confirm.component";

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
                    <Select.Option label="English" value="en"/>
                    <Select.Option label="Vietnamese" value="vn"/>
                </Select>
                <Router>
                    <PrivateRoute component={LayoutComponent} path="/" >
                        <Redirect exact from="/" to={BOOKING} noThrow />
                        <Booking path={BOOKING}/>
                        <BookingHistory path={BOOKING_HISTORY} />
                        <AddressBook path={ADDRESS_BOOK} />
                        <ConfirmComponent path={CONFIRM} />
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
