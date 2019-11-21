// module.exports = (page, currentPage) => {
//     let navigation = [
//         {
//             text: `<<`,
//             callback_data: JSON.stringify({
//                 whatDo: 'prevPageChat',
//                 page: `${currentPage <= page.pageCount && currentPage > 1
//                     ? +currentPage - 1 : page.pageCount}`
//             })
//         },
//         {
//             text: `Cancel`,
//             callback_data: JSON.stringify({whatDo: 'CancelChat'})
//         },
//         {
//             text: `>>`,
//             callback_data: JSON.stringify({
//                 whatDo: 'nextPageChat',
//                 page: `${currentPage < page.pageCount
//                     ? +currentPage + 1 : 1}`
//             })
//         }];
//
//     let delChatOption = page.objects.map(value => {
//         return [{
//             text: `Delete ${value.chat_title}`,
//             callback_data: JSON.stringify({
//                 id: value.chat_id,
//                 page: +currentPage,
//                 // title: `${value.chat_id}`,
//                 whatDo: 'delChat'
//             })
//         }]
//     });
//
//     delChatOption.push(navigation);
//     return delChatOption;
// };

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
                whatDo: 'sendMessage'
            })
        }]
    });

    delChatOption.push(navigation);
    return delChatOption;
};

// module.exports = (chats) => {
//     let navigation = [
//         {
//             text: `<<`,
//             callback_data: JSON.stringify({whatDo: 'prevPage'})
//         },
//         {
//             text: `>>`,
//             callback_data: JSON.stringify({whatDo: 'nextPage'})
//         }];
//
//     let delChatOption = chats.map(value => {
//         return [{
//             text: `Delete ${value.chat_title}`,
//             callback_data: JSON.stringify({
//                 id: value.chat_id,
//                 title: `${value.chat_id}`,
//                 whatDo: 'delChat'
//             })
//         }]
//     });
//
//     delChatOption.push(navigation);
//     return delChatOption;
// };
