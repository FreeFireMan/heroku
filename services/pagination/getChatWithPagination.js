module.exports = (result) => {
    let navigation = [
        {
            text: `<<`,
            callback_data: JSON.stringify({whatDo: 'prevPage'})
        },
        {
            text: `>>`,
            callback_data: JSON.stringify({whatDo: 'nextPage'})
        }];

    let delChatOption = result.map(value => {
        return [{
            text: `Delete ${value.chat_title}`,
            callback_data: JSON.stringify({
                id: value.chat_id,
                title: `${value.chat_title}`,
                whatDo: 'delChat'
            })
        }]
    });

    delChatOption.push(navigation);
    return delChatOption;
};
