import integrate from './integrate';
import {LIST_ADDRESS} from "./integrate.endpoint";

export const listDataSuggest = () => {
    return integrate.makeRequest({
        url: LIST_ADDRESS,
        method: 'GET',
    });

};
