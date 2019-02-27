import integrate from './integrate';
import {USER, CHANGE_PASSWORD} from "./integrate.endpoint";
import {processString} from "../utils/string";
import UserInfoStorage from "../utils/user-info";

// User settings ---------------------------------------------------------------
export const getUserInfo = () => {
    return integrate.makeAuthRequest({
        url: processString.parseUrl(USER, {userId: UserInfoStorage.getUserId()}),
        method: 'GET',
    });
};

export const updateUserInfo = (data) => {
    return integrate.makeAuthRequest({
        url: processString.parseUrl(USER, {userId: UserInfoStorage.getUserId()}),
        method: 'PUT',
        data
    });
};

// Address default


// Change password
export const changePassword = (data) => {
    return integrate.makeAuthRequest({
        url: processString.parseUrl(CHANGE_PASSWORD, {userId: UserInfoStorage.getUserId()}),
        method: 'POST',
        data
    });
};
