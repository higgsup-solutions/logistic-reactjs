export const API_ROOT = 'http://192.168.1.10:8080/api';
export const LOGIN = '/auth/login';
export const REFRESH_TOKEN = '/auth/token';
export const LOGOUT = '/logout';
export const REGISTER = '/auth/create';
export const DASHBOARD = '/profile';
export const BUY_SALE = '/school';
export const LIST_CITY = '/countries/{id}/cities';
export const LIST_CARRIER = '/carrier';
export const LIST_DIMENSION = '/user/{userId}/dimensions?limit={amountLimited}';
export const BOOKING_HISTORY_LIST = '/transaction/search';
export const GET_ADDRESS_LIST = '/user/{userId}/addresses';
export const ADD_ADDRESS = '/user/{userId}/addresses';
export const UPDATE_ADDRESS = '/user/{userId}/addresses/{addressId}';
export const DELETE_ADDRESS = '/user/{userId}/addresses/{addressId}';
export const QUOTE = '/carrier/{carrierId}/quote';
export const CONFIRM_BOOKING = '/transaction/confirmBooking';

// Settings Page
export const USER = '/user/{userId}';
export const CHANGE_PASSWORD = USER + '/change_pass';
