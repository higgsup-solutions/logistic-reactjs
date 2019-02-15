import intergrate from './intergrate';
import {API_ROOT, BUYSALE} from './intergrate.endpoint';

export const buysale = {
    get: () => {
        let filterUrl = `?limit=10&offset=0`;

        return intergrate.request.get(`${API_ROOT}${BUYSALE}${filterUrl}`).then(res => {
            return res.data;
        })
    },
};