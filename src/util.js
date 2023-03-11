export const sortData = (data) => {
    const sortedData = [...data];
    // One line version
    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));


    /* Long version
    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }
    });
    return sortedData;
    */
};