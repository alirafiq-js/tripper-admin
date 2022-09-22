const filterDuplicate = (exisitingArray, newArray) => {
    const results = newArray.filter(({ _id: id1 }) => !exisitingArray.some(({ _id: id2 }) => id2.toString() === id1.toString()));
    return results;
};

module.exports = {
    filterDuplicate
}