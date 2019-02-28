import integrate from './integrate';
import {
    USER,
    CHANGE_PASSWORD,
    DIMENSION_LIST,
    DIMENSION_MODIFY,
    DIMENSION
} from "./integrate.endpoint";
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
export const getDimensionList = () => {
    return integrate.makeAuthRequest({
        url: processString.parseUrl(DIMENSION_LIST, {userId: UserInfoStorage.getUserId()}),
        method: 'GET'
    });
};

export const deleteDimensionList = (dimensionId) => {
    const params = {
        userId: UserInfoStorage.getUserId(),
        dimensionId
    };
    return integrate.makeAuthRequest({
        url: processString.parseUrl(DIMENSION_MODIFY, params),
        method: 'DELETE'
    });
};

export const addDimension = (data) => {
    const params = {
        userId: UserInfoStorage.getUserId(),
    };
    return integrate.makeAuthRequest({
        url: processString.parseUrl(DIMENSION, params),
        method: 'POST',
        data
    });
};

export const updateDimension = (dimensionId, data) => {
    const params = {
        userId: UserInfoStorage.getUserId(),
        dimensionId
    };
    return integrate.makeAuthRequest({
        url: processString.parseUrl(DIMENSION_MODIFY, params),
        method: 'PUT',
        data
    });
};

// Change password
export const changePassword = (data) => {
    return integrate.makeAuthRequest({
        url: processString.parseUrl(CHANGE_PASSWORD, {userId: UserInfoStorage.getUserId()}),
        method: 'POST',
        data
    });
};
