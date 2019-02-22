const TOKEN_STORAGE_KEY = 'authToken';

class TokenStorage {

    static store(authToken) {
        localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(authToken));
    }

    static clear() {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
    }

    static getAccessToken() {
        return JSON.parse(localStorage.getItem(TOKEN_STORAGE_KEY)).accessToken
    }

    static getRefreshToken() {
        return JSON.parse(localStorage.getItem(TOKEN_STORAGE_KEY)).refreshToken
    }

    static isTokenPresent() {
        return localStorage.getItem(TOKEN_STORAGE_KEY) != null;
    }
}

export default TokenStorage;
