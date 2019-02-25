import TokenStorage from "./token";
import jwt_decode from "jwt-decode";

let USER_INFO;

class UserInfoStorage {
    static getUserInfo() {
        if (USER_INFO == null) {
            USER_INFO = jwt_decode(TokenStorage.getAccessToken());
        }

        return USER_INFO;
    }

    static getUserId() {
        return this.getUserInfo().jti;
    }

    static getUserEmail() {
        return this.getUserInfo().sub;
    }
}

export default UserInfoStorage;
