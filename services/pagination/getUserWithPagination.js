module.exports = (page,currentPage) => {
    let navigation = [
        {
            text: `<<`,
            callback_data: JSON.stringify({
                whatDo: 'prevPage',
                page: `${currentPage<=page.pageCount && currentPage>1
                    ? +currentPage-1 : page.pageCount}`})
        },
        {
            text: `Cancel`,
            callback_data: JSON.stringify({whatDo: 'Cancel'})
        },
        {
            text: `>>`,
            callback_data: JSON.stringify({
                whatDo: 'nextPage',
                page: `${currentPage<page.pageCount
                    ? +currentPage+1 : 1}`})
        }];

    let delUserOption = page.objects.map(value => {
        return [{
            text: `Delete ${value.first_name ? value.first_name : ''} ${value.last_name ? value.last_name : ''} ${value.phone_number ? value.phone_number : ''}`,
            callback_data: JSON.stringify({
                id: value.data_id,
                page : +currentPage,
                // title: `${value.first_name ? value.first_name : ''} ${value.last_name ? value.last_name : ''}`,
                whatDo: 'delUser'
            })
        }]
    });

    delUserOption.push(navigation);
    return delUserOption;
};
