import integrate from "./integrate";
import {processString} from "../utils/string";
import {GET_ADDRESS_BOOK} from "./integrate.endpoint";
import UserInfoStorage from "../utils/user-info";

export const getAddressBook = () => {
    return integrate.makeAuthRequest({
        url: processString.parseUrl(GET_ADDRESS_BOOK, {userId: UserInfoStorage.getUserId()}),
        method: 'GET',
    });
};
