import React from 'react'

const Authorization = ({ component: Component, allowedRoles, ...rest }) => (
    (allowedRoles.includes('admin')) ?
        <Component {...rest} /> : <h1 className="p-5">You Have No Role To Access This Page</h1>
);

export default Authorization;
