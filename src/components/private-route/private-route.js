import React from 'react'
import {Redirect} from "@reach/router";
import TokenStorage from "../../utils/token";

const PrivateRoute = ({ component: Component, ...rest }) => (
    TokenStorage.isTokenPresent() ? <Component {...rest} /> : <Redirect to='/public/login' noThrow />
);

export default PrivateRoute;
