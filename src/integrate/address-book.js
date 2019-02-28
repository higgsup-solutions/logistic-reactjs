import integrate from "./integrate";
import {processString} from "../utils/string";
import {ADD_ADDRESS, GET_ADDRESS_LIST, UPDATE_ADDRESS} from "./integrate.endpoint";
import UserInfoStorage from "../utils/user-info";

export const getAddressBook = () => {
    return integrate.makeAuthRequest({
        url: processString.parseUrl(GET_ADDRESS_LIST, {userId: UserInfoStorage.getUserId()}),
        method: 'GET',
    });
};

export const addAddress = (data) => {
    return integrate.makeAuthRequest({
        url: processString.parseUrl(ADD_ADDRESS, {userId: UserInfoStorage.getUserId()}),
        method: 'POST',
        data: data
    });
};

export const updateAddress = (data) => {
    return integrate.makeAuthRequest({
        url: processString.parseUrl(UPDATE_ADDRESS, {userId: UserInfoStorage.getUserId(), addressId: data.id}),
        method: 'PUT',
        data: data
    });
};
