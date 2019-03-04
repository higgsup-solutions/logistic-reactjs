import integrate from './integrate';
import {
    DIMENSION_LIST,
    DIMENSION_MODIFY,
    DIMENSION
} from "./integrate.endpoint";
import {processString} from "../utils/string";
import UserInfoStorage from "../utils/user-info";

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
