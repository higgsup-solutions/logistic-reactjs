import integrate from './integrate';
import {LIST_ADDRESS, LIST_CARRIER, LIST_CITY, LIST_DIMENSION, QUOTE, SAVE_ADDRESS} from "./integrate.endpoint";
import {processString} from "../utils/string";

export const listDataSuggest = () => {
    return integrate.makeAuthRequest({
        url: processString.parseUrl(LIST_ADDRESS, {userId: 5}),
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
        url: processString.parseUrl(LIST_DIMENSION, {userId: 5, amountLimited: 5}),
        method: 'GET',
    });
};

export const saveAddressToBook = (data) => {
    return integrate.makeAuthRequest({
        url: processString.parseUrl(SAVE_ADDRESS, {userId: 5}),
        method: 'POST',
        data: data
    });
};

export const quote = (data) => {
    return integrate.makeAuthRequest({
        url: processString.parseUrl(QUOTE),
        method: 'POST',
        data: data
    });
};