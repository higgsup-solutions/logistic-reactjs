export const REGEX_EMAIL = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
export const REGEX_PHONE_NUMBER = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
export const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const MODIFY_MODE = {
    ADD_MODE: 'add',
    EDIT_MODE: 'edit'
};
