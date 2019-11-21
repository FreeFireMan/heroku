let {bot} = require('../settingsBot');
let controller = require('../controller');
let {getChatWithPagination, pagination} = require('../services/pagination');

module.exports = async (msg) => {
    if (msg.chat.type === 'private') {
        let id = msg.from.id;
        let isAdmin = await controller.user.findUserWithAdmin(id);
        if (isAdmin) {
            let modelName = 'Chat';
            let currentPage = 1;
            const limitItems = 5;
            let result = await pagination(currentPage, limitItems, modelName);

            let delChatOption = await getChatWithPagination(result,1);

            bot.sendMessage(msg.chat.id, "Select chat for delete", {
                reply_markup: {
                    inline_keyboard: delChatOption
                }
            });

            bot.on('callback_query', async (query) => {
                let parseData = JSON.parse(query.data);

                switch (parseData.whatDo) {
                    case "delChat": {
                        let chat = await controller.chat.findChat(parseData.id);
                        await controller.chat.deleteChatByIdTelegram(parseData.id);

                        bot.sendMessage(msg.chat.id, `You delete a: ${chat.chat_title}`);

                        let newPageArray = await pagination(parseData.page, limitItems, modelName);
                        let nextPageOption = await getChatWithPagination(newPageArray,parseData.page);

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

                    case "nextPageChat": {
                        let newPageArray = await pagination(parseData.page, limitItems, modelName);
                        let nextPageOption = await getChatWithPagination(newPageArray,parseData.page);

                        await bot.editMessageReplyMarkup(
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

                    case "prevPageChat": {
                        let newPageArray = await pagination(parseData.page, limitItems, modelName);
                        let nextPageOption = await getChatWithPagination(newPageArray,parseData.page);

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
                    case "CancelChat":
                        bot.deleteMessage(query.message.chat.id,query.message.message_id);
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
