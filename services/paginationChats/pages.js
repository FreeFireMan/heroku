module.exports = (arr,PAGE) => {
    // return arr.map((value, index) => {
    //     if (index === PAGE) {
    //         return [
    //             {text: `Delete ${value.phone_number}`, callback_data: `Delete:${value.phone_number}`}
    //         ]
    //     }
    // });
    let arrayWith1Page = [];
    for (let i = 0; i < arr[PAGE].length; i++) {
        arrayWith1Page.push(arr[PAGE][i]);
    }
    return chats = arrayWith1Page.map(value => {
        return [
            {text: `Delete ${value.phone_number}`, callback_data: `Delete:${value.phone_number}`}
        ]
    });
};
