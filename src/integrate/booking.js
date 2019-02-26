import integrate from './integrate';
import {GET_ADDRESS_BOOK, LIST_CARRIER, LIST_CITY, LIST_DIMENSION, QUOTE, SAVE_ADDRESS} from "./integrate.endpoint";
import {processString} from "../utils/string";
import UserInfoStorage from "../utils/user-info";

export const listDataSuggest = () => {
    return integrate.makeAuthRequest({
        url: processString.parseUrl(GET_ADDRESS_BOOK, {userId: UserInfoStorage.getUserId()}),
        method: 'GET',
    });
};
export const listDataCity = (countryId) => {
    return integrate.makeAuthRequest({
        url: processString.parseUrl(LIST_CITY, {id: countryId}),
        method: 'GET',
    });
};
export const listCarrier = () => {
    return integrate.makeAuthRequest({
        url: processString.parseUrl(LIST_CARRIER),
        method: 'GET',
    });
};
export const listDimension = () => {
    return integrate.makeAuthRequest({
        url: processString.parseUrl(LIST_DIMENSION, {userId: UserInfoStorage.getUserId(), amountLimited: 5}),
        method: 'GET',
    });
};

export const saveAddressToBook = (data) => {
    return integrate.makeAuthRequest({
        url: processString.parseUrl(SAVE_ADDRESS, {userId: UserInfoStorage.getUserId()}),
        method: 'POST',
        data: data
    });
};

export const quote = (carrierId, data) => {
    return integrate.makeAuthRequest({
        url: processString.parseUrl(QUOTE, {carrierId}),
        method: 'POST',
        data: data
    });
};
