import integrate from './integrate';
import {LOGIN} from "./integrate.endpoint";

export const login = (data) => {

    return integrate.makeRequest({
        url: LOGIN,
        method: 'POST',
        data
    });

};
