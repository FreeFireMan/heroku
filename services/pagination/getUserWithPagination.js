module.exports = (users) => {
    let navigation = [
        {
            text: `<<`,
            callback_data: JSON.stringify({whatDo: 'prevPage'})
        },
        {
            text: `>>`,
            callback_data: JSON.stringify({whatDo: 'nextPage'})
        }];

    let delUserOption = users.map(value => {
        return [{
            text: `Delete ${value.first_name ? value.first_name : ''} ${value.last_name ? value.last_name : ""} ${value.phone_number ? value.phone_number : ''}`,
            callback_data: JSON.stringify({
                id: value.data_id,
                title: `${value.first_name ? value.first_name : ''} ${value.last_name ? value.last_name : ""}`,
                whatDo: 'delUser'
            })
        }]
    });

    delUserOption.push(navigation);
    return delUserOption;
};
