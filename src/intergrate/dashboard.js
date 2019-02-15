import intergrate from './intergrate';
import {API_ROOT, DASHBOARD} from './intergrate.endpoint';

export const dashboard = {
    get: () => {
        let filterUrl = `?limit=10&offset=0`;

        return intergrate.request.get(`${API_ROOT}${DASHBOARD}${filterUrl}`).then(res => {
            return res.data;
        })
    },
};