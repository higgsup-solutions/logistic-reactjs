const TOKEN_STORAGE_KEY = 'authToken';

class TokenStorage {

    static store(authToken) {
        localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(authToken));
    }

    static clear() {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
    }

    static getAccessToken() {
        return this._getToken().accessToken;
    }

    static getRefreshToken() {
        return this._getToken().refreshToken;
    }

    static isTokenPresent() {
        if (!this._getToken()) return false;
        if (!this.getAccessToken()) return false;
        if (!this.getRefreshToken()) return false;

        return true;
    }

    static _getToken() {
        return JSON.parse(localStorage.getItem(TOKEN_STORAGE_KEY) || '{}');
    }
}

export default TokenStorage;
