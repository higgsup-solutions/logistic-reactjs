import integrate from './integrate';
import {LOGIN, LOGOUT} from "./integrate.endpoint";

export const login = (data) => {
    return integrate.makeRequest({
        url: LOGIN,
        method: 'POST',
        data
    });

};

export const logout = () => {
    return integrate.makeAuthRequest({
        url: LOGOUT,
        method: 'POST'
    });
};
