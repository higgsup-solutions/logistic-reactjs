export const fieldName = {
    mappingBookingPage: (key) => {
        const listFieldName = {
            emailAddress: 'email',
            contactName: 'contact name',
            cityName: 'city name',
            address1: 'address',
            phoneNumber: 'phone number'
        };
        let result = listFieldName[key];
        if(!result) return key;
        return result;
    },
};