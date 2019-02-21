import axios from "axios"
import {API_ROOT} from "./integrate.endpoint";
import { Notification } from 'element-react';

const _getAppVersion = () => {
    return '1.0.0';
};

// todo: depend on env
const _baseURL = API_ROOT || '';

const _request = axios.create({
    baseURL: _baseURL,
    timeout: 15000,
});

// request interceptor
_request.interceptors.request.use(
    config => {
        // Do something before request is sent
        // const header = {
        //     // add header ...
        // };
        // config.headers = {...config.headers, header};
        // console.log(`before sending request...`);
        return config
    },
    error => {
        // Do something with request error
        console.log(error); // for debug
        return Promise.reject(error)
    }
);

// response interceptor
_request.interceptors.response.use(
    response => {
        // console.log(`before receiving response...`);
        return response
    },
    error => {
        Notification.error({
            title: 'Error',
            message: `${error.response.data.message}`
        });
        return Promise.reject(error)
    }
);

const makeAuthRequest = (args) => {
    const {accessToken} = localStorage.getItem('authToken');
    const _headers = args.headers ? args.headers : {};
    const defaultHeaders = {
        'Authorization': accessToken,
    };

    const argsUpdated = {
        ...args,
        headers: {
            ...defaultHeaders,
            ..._headers,
        }
    };

    return this.makeRequest(argsUpdated);
};

const makeRequest = (args) => {
    const _headers = args.headers ? args.headers : {};

    const defaultHeaders = {
        'X-App-Version': _getAppVersion(),
    };

    args = {
        ...args,
        headers: {
            ...defaultHeaders,
            ..._headers
        }
    };

    return _request(args)
        .then(({data}) => {
            return Promise.resolve(data);
        });
};

export default {
    makeAuthRequest,
    makeRequest
};
