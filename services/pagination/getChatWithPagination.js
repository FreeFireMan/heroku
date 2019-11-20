module.exports = (chats) => {
    let navigation = [
        {
            text: `<<`,
            callback_data: JSON.stringify({whatDo: 'prevPage'})
        },
        {
            text: `>>`,
            callback_data: JSON.stringify({whatDo: 'nextPage'})
        }];

    let delChatOption = chats.map(value => {
        return [{
            text: `Delete ${value.chat_title}`,
            callback_data: JSON.stringify({
                id: value.chat_id,
                title: `${value.chat_id}`,
                whatDo: 'delChat'
            })
        }]
    });

    delChatOption.push(navigation);
    return delChatOption;
};
