const dateFormat = {
    ddmmyyyy: (date) => {
        const d = new Date(date);
        return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    },
    ddmmyyyyMinus: (date) => {
        const d = new Date(date);
        return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    },
    ddmmyyyyHHMM: (date) => {
        const d = new Date(date);
        return d.toLocaleDateString("en-GB",{ year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric',minute:'numeric' });
    },
};

export default {
    dateFormat
}
