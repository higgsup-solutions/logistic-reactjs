import axios from 'axios';
import {API_ROOT, LOGIN} from "./intergrate.endpoint";

const header = {
    'Content-Type': 'application/json',
    'Authorization': `${localStorage.getItem('authorization')}`
};

const request = {
    get: (url) => {
        return axios.get(url, {headers: header}).then(res => {
            return res.data;
        })
    },
    post: (data, url) => {
        return axios.post(url, data).then(res => {
            return res;
        })
    },
    put: (data, url) => {
        return axios.put(url, data, {headers: header}).then(res => {
            return res.data;
        })
    },
    delete: (url) => {
        return axios.delete(url, {headers: header}).then(res => {
            return res.data;
        })
    },
};

const auth = {
    login: (data) => {
        return request.post(data, `${API_ROOT}${LOGIN}`).then(res => {
            if (res.data.success) {
                localStorage.setItem('authentication', `Bearer ${res.data.data.accessToken}`);
                header['Authorization'] = `${localStorage.getItem('authentication')}`;
            }
            return res.data;
        });
    }
};

export default {
    request,
    auth
}