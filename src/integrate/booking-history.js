import {BOOKING_HISTORY_LIST} from './integrate.endpoint';
import integrate from "./integrate";

export const getBookingHistory = (pageIndex, pageSize, textSearch) => {

    const queries = `?page=${pageIndex}&size=${pageSize}&textSearch=${textSearch}`;

    return integrate.makeAuthRequest({
        url: `${BOOKING_HISTORY_LIST}${queries}`,
        method: 'GET'
    });

};
