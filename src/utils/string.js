export const processString = {
    parseUrl: (url, objParams) => {
        let result = url;
        if(!objParams) {
            return url;
        }
        for(let param in objParams) {
            result = result.replace(param, objParams[param]);
        }
        return result;
    },
};