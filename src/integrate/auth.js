import integrate from './integrate';
import {LOGIN, LOGOUT, REGISTER} from "./integrate.endpoint";
import TokenStorage from "../utils/token";
import UserInfoStorage from "../utils/user-info";

export const login = (data) => {
    return integrate.makeRequest({
        url: LOGIN,
        method: 'POST',
        data
    });

};

export const logout = () => {
    TokenStorage.clear();
    UserInfoStorage.clearUserInfo();
    return integrate.makeAuthRequest({
        url: LOGOUT,
        method: 'POST'
    });
};

export const register = (data) => {
    return integrate.makeRequest({
        url: REGISTER,
        method: 'POST',
        data
    });
};
