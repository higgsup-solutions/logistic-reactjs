import React from 'react'

const Authorization = ({ component: Component, allowedRoles, ...rest }) => (
    (allowedRoles.includes('manager')) ?
        <Component {...rest} /> : <h1>You Have No Role To Access This Page</h1>
);

export default Authorization;
