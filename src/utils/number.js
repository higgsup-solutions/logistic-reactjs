export const processNumber = {
    checkExistNotNumber: (str) => {
        const listChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let result = false;
        for(let i = 0 ; i < str.length; i++) {
            if(!listChar.includes(str[i])) {
                result = true;
            }
        }
        return result;
    },
    checkExistNotNumberFloat: (str) => {
        const listChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
        let result = false;
        for(let i = 0 ; i < str.length; i++) {
            if(!listChar.includes(str[i])) {
                result = true;
            }
        }
        return result;
    }
};