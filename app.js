let db = require('./database').getInstance();
db.setModels();

let {bot} = require('./settingsBot');

let routes = require('./routes');

let controller = require('./controller');
let {getChatWithPagination, pagination} = require('./services/pagination');

// User Registration in database
bot.onText(/\/regme/, routes.regme);

// User Accept to admin
bot.onText(/\/adminadd (.+)/, routes.addminadd);

// User Delete from admin
bot.onText(/\/admindel/, routes.admindel);

// All User show admin
bot.onText(/\/adminshow/, routes.adminshow);

// Chat Registration
bot.onText(/\/chatreg/, routes.chatreg);

// Chat Delete
bot.onText(/\/chatdel/, routes.chatdel);

// All Chat Show and send message IN TEST
bot.onText(/\/test/, async (msg) => {
    if (msg.chat.type === 'private') {
        let id = msg.from.id;
        let isAdmin = await controller.user.findUserWithAdmin(id);
        if (isAdmin) {
            let groups = [];

            let modelName = 'Chat';
            let currentPage = 1;
            const limitItems = 5;
            let result = await pagination(currentPage, limitItems, modelName);

            let delChatOption = await getChatWithPagination(result.objects);
            let countPages = result.pageCount;

            bot.sendMessage(msg.chat.id, "Select chat for send", {
                reply_markup: {
                    inline_keyboard: delChatOption
                }
            });

            bot.on('callback_query', async (query) => {
                console.log(query);
                let parseData = JSON.parse(query.data);

                switch (parseData.whatDo) {
                    case "sendMessage": {
                        if (!groups.includes(parseData.id)) {
                            groups.push(parseData.id);
                        } else if (groups.includes(parseData.id)) {
                            let index = groups.indexOf(parseData.id);
                            if (index !== -1) {
                                groups.splice(index, 1);
                            }
                        }

                        console.log(groups);

                        bot.sendMessage(msg.chat.id, `You selected chat with ID: ${groups.toString()}`);

                        let newPageArray = await pagination(currentPage, limitItems, modelName);
                        countPages = newPageArray.pageCount;
                        let nextPageOption = await getChatWithPagination(newPageArray.objects);

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
                            let nextPageOption = await getChatWithPagination(newPageArray.objects);

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
                    }
                        break;

                    case "prevPage": {
                        if (currentPage > 1) {
                            let newPageArray = await pagination(--currentPage, limitItems, modelName);
                            let nextPageOption = await getChatWithPagination(newPageArray.objects);

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

                bot.once("message", (message, metadata) => {
                    let text = message.text;

                    for (let i = 0; i < groups.length; i++) {
                        bot.sendMessage(groups[i], text);
                    }
                });

                bot.once("photo", (message, metadata) => {
                    let photo = message.photo[0].file_id;
                    let caption = message.caption;

                    for (let i = 0; i < groups.length; i++) {
                        bot.sendPhoto(groups[i], photo, {caption: caption});
                    }
                });

                bot.once("voice", (message, metadata) => {
                    let voice = message.voice.file_id;

                    for (let i = 0; i < groups.length; i++) {
                        bot.sendVoice(groups[i], voice);
                    }
                });

                bot.once("video_note", (message, metadata) => {
                    let videoNote = message.video_note.file_id;

                    for (let i = 0; i < groups.length; i++) {
                        bot.sendVideoNote(groups[i], videoNote);
                    }
                });
            });
        } else {
            bot.sendMessage(msg.chat.id, `Sorry, ${msg.from.first_name ? msg.from.first_name : ''} ${msg.from.last_name ? msg.from.last_name : ''} ${msg.from.phone_number ? msg.from.phone_number : ''} ${msg.from.username ? msg.from.username : ''} you don't have permisions on this operation!`);
        }
    }


    // let groups = [];
    //
    // bot.sendMessage(msg.chat.id, 'text', {
    //     reply_markup: {
    //         inline_keyboard: [
    //             [{
    //                 text: 'Button 1',
    //                 callback_data: JSON.stringify(
    //                     {
    //                         id: -333662687,
    //                         title: 1,
    //                         whatDo: 'sendMsg'
    //                     })
    //             }],
    //             [{
    //                 text: 'Кнопка 2', callback_data: JSON.stringify(
    //                     {
    //                         id: -336786315,
    //                         title: 2,
    //                         whatDo: 'sendMsg'
    //                     })
    //             }],
    //             [{
    //                 text: 'STOP', callback_data: JSON.stringify(
    //                     {
    //                         id: 4,
    //                         title: 4,
    //                         whatDo: 'stop'
    //                     })
    //             }],
    //         ]
    //     }
    // });
    //
    // bot.on('callback_query', async (query) => {
    //     let parseData = JSON.parse(query.data);
    //     switch (parseData.whatDo) {
    //         case "sendMsg": {
    //             if (!groups.includes(parseData.id)) {
    //                 groups.push(parseData.id);
    //             } else if (groups.includes(parseData.id)) {
    //                 let index = groups.indexOf(parseData.id);
    //                 if (index !== -1) {
    //                     groups.splice(index, 1);
    //                 }
    //             }
    //         }
    //             break;
    //     }
    // });
    //
    // bot.once("message", (message, metadata) => {
    //     let text = message.text;
    //
    //     for (let i = 0; i < groups.length; i++) {
    //         bot.sendMessage(groups[i], text);
    //     }
    // });
    //
    // bot.once("photo", (message, metadata) => {
    //     let photo = message.photo[0].file_id;
    //     let caption = message.caption;
    //
    //     for (let i = 0; i < groups.length; i++) {
    //         bot.sendPhoto(groups[i], photo, {caption: caption});
    //     }
    // });
    //
    // bot.once("voice", (message, metadata) => {
    //     let voice = message.voice.file_id;
    //
    //     for (let i = 0; i < groups.length; i++) {
    //         bot.sendVoice(groups[i], voice);
    //     }
    // });
    //
    // bot.once("video_note", (message, metadata) => {
    //     let videoNote = message.video_note.file_id;
    //
    //     for (let i = 0; i < groups.length; i++) {
    //         bot.sendVideoNote(groups[i], videoNote);
    //     }
    // });
});

// Help
bot.onText(/\/help/, routes.help);
