import {BUY_SALE} from './integrate.endpoint';
import integrate from "./integrate";

export const buysale = () => {

    let filterUrl = `?limit=10&offset=0`;

    return integrate.makeRequest({
        url: `${BUY_SALE}${filterUrl}`,
        method: 'GET'
    });

};
