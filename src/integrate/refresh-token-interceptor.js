import axios from "axios";
import {API_ROOT, REFRESH_TOKEN} from "./integrate.endpoint";
import TokenStorage from "../utils/token";
import {Notification} from "element-react";
import {navigate} from "@reach/router";
import {logout} from "./auth";

const defaults = {
    statusCodes: [
        401 // Unauthorized
    ]
};

function createAuthRefreshInterceptor (axios, options = {}) {
    const id = axios.interceptors.response.use(res => res, error => {

        // Reject promise if the error status is not in options.ports or defaults.ports
        const statusCodes = options.hasOwnProperty('statusCodes') && options.statusCodes.length
            ? options.statusCodes
            : defaults.statusCodes;
        if (!error.response ||
            // In case: response error code difference from `defaults`
            (error.response.status && statusCodes.indexOf(+error.response.status) === -1) ||
            // In case: login fail
            (error.response.config.url.indexOf('login') > 0)) {
            Notification.error({
                title: 'Error',
                message: `${error.response.data.message}`
            });
            return Promise.reject(error);
        }

        // Remove the interceptor to prevent a loop
        // in case token refresh also causes the 401
        axios.interceptors.response.eject(id);

        const refreshCall = refreshTokenCall(error);

        // Create interceptor that will bind all the others requests
        // until refreshTokenCall is resolved
        const requestQueueInterceptorId = axios.interceptors
            .request
            .use(request => refreshCall.then(() => request));

        // When response code is 401 (Unauthorized), try to refresh the token.
        return refreshCall.then(() => {
            axios.interceptors.request.eject(requestQueueInterceptorId);
            return axios(error.response.config);
        }).catch(error => {
            axios.interceptors.request.eject(requestQueueInterceptorId);

            const data = error.response.data || null;
            if (data && data.errorCode == 10 && data.status == 401) {
                Notification.error({
                    title: 'Error',
                    message: 'Session timeout, please login to application!'
                });
                // logout
                logout();
                TokenStorage.clear();
                navigate('/');
            }
            return Promise.reject(error)
        }).finally(() => createAuthRefreshInterceptor(axios, refreshTokenCall, options));
    });
    return axios;
}

const refreshTokenCall = err => axios.get(
    API_ROOT + REFRESH_TOKEN,
    {headers: {Authorization: TokenStorage.getRefreshToken()}})
    .then(res => {
            let authToken = {
                accessToken: `Bearer ${res.data.token}`,
                refreshToken: TokenStorage.getRefreshToken()
            };
            TokenStorage.store(authToken);
            err.response.config.headers['Authorization'] = 'Bearer ' + res.data.token;
            return Promise.resolve();
        }
    );


export default createAuthRefreshInterceptor;
