import api from './api';
import {LOGIN} from "./intergrate.endpoint";

export const login = (data) => {

    return api.makeRequest({
        url: LOGIN,
        method: 'POST',
        data
    });

};
