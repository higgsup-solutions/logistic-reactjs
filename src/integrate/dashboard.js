import {DASHBOARD} from './integrate.endpoint';
import integrate from "./integrate";

export const dashboard = () => {

    let filterUrl = `?limit=10&offset=0`;

    return integrate.makeRequest({
        url: `${DASHBOARD}${filterUrl}`,
        method: 'GET'
    });

};
