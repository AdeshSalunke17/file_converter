export const validate = filesArray => {
    const filterArray = filesArray.filter(file => file?.toFormat === '' || file?.toFormat === undefined);
    return filterArray.length > 0 ? false : true;
}