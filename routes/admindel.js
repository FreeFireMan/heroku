let {bot} = require('../settingsBot');
let controller = require('../controller');
let {getUserWithPagination, pagination} = require('../services/pagination');

module.exports = async (msg) => {
    if (msg.chat.type === 'private') {
        let id = msg.from.id;
        let isAdmin = await controller.user.findUserWithAdmin(id);
        if (isAdmin) {
            let modelName = 'User';
            let currentPage = 1;
            const limitItems = 5;
            let result = await pagination(currentPage, limitItems, modelName);

            let delUserOption = await getUserWithPagination(result.objects);
            let countPages = result.pageCount;

            bot.sendMessage(msg.chat.id, "Select admin for delete", {
                reply_markup: {
                    inline_keyboard: delUserOption
                }
            });

            bot.on('callback_query', async (query) => {
                let parseData = JSON.parse(query.data);

                switch (parseData.whatDo) {
                    case "delUser": {
                        await controller.user.deleteUserByIdTelegram(parseData.id);

                        bot.sendMessage(msg.chat.id, `You delete a: ${parseData.title}`);

                        let newPageArray = await pagination(currentPage, limitItems, modelName);
                        countPages = newPageArray.pageCount;
                        let nextPageOption = await getUserWithPagination(newPageArray.objects);

                        bot.editMessageReplyMarkup(
                            {
                                inline_keyboard: nextPageOption
                            },
                            {
                                chat_id: query.message.chat.id,
                                message_id: query.message.message_id
                            }
                        );
                    }
                        break;

                    case "nextPage": {
                        if (currentPage < countPages) {
                            let newPageArray = await pagination(++currentPage, limitItems, modelName);
                            let nextPageOption = await getUserWithPagination(newPageArray.objects);

                            bot.editMessageReplyMarkup(
                                {
                                    inline_keyboard: nextPageOption
                                },
                                {
                                    chat_id: query.message.chat.id,
                                    message_id: query.message.message_id
                                }
                            );
                        }
                    }
                        break;

                    case "prevPage": {
                        if (currentPage > 1) {
                            let newPageArray = await pagination(--currentPage, limitItems, modelName);
                            let nextPageOption = await getUserWithPagination(newPageArray.objects);

                            bot.editMessageReplyMarkup(
                                {
                                    inline_keyboard: nextPageOption
                                },
                                {
                                    chat_id: query.message.chat.id,
                                    message_id: query.message.message_id
                                }
                            );
                        }
                    }
                        break;

                    default:
                        bot.sendMessage(msg.chat.id, "Something went wrong");
                }
            });
        } else {
            bot.sendMessage(msg.chat.id, `Sorry, ${msg.from.first_name ? msg.from.first_name : ''} ${msg.from.last_name ? msg.from.last_name : ''} ${msg.from.phone_number ? msg.from.phone_number : ''} ${msg.from.username ? msg.from.username : ''} you don't have permisions on this operation!`);
        }
    }
};
