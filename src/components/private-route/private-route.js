import React from 'react'
import {Redirect} from "@reach/router";

const PrivateRoute = ({ component: Component, ...rest }) => (
    (localStorage.getItem("authentication")) ? <Component {...rest} /> : <Redirect to='/public/login' noThrow />
);

export default PrivateRoute;
