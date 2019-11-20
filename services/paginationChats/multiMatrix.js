module.exports = (arr, width) => {
    return arr.reduce(function (rows, key, index) {
        return (index % width === 0 ? rows.push([key])
            : rows[rows.length - 1].push(key)) && rows;
    }, []);
    // const toMatrix = (arr, width) =>
    //     arr.reduce((rows, key, index) => (index % width === 0 ? rows.push([key])
    //         : rows[rows.length - 1].push(key)) && rows, []);
};
