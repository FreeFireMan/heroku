let db = require('./database').getInstance();
db.setModels();

let {bot} = require('./settingsBot');
let routes = require('./routes');

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
bot.onText(/\/test/, (msg, match) => {
    let groups = [];
    bot.sendMessage(msg.chat.id, 'text', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Button 1',
                    callback_data: JSON.stringify(
                        {
                            id: -333662687,
                            title: 1,
                            whatDo: 'sendMsg'
                        })
                }],
                [{
                    text: 'Кнопка 2', callback_data: JSON.stringify(
                        {
                            id: 2,
                            title: 2,
                            whatDo: 'sendMsg'
                        })
                }],
                [{
                    text: 'Кнопка 3', callback_data: JSON.stringify(
                        {
                            id: -336786315,
                            title: 3,
                            whatDo: 'sendMsg'
                        })
                }]
            ]
        }
    });
    bot.on('callback_query', async (query) => {
        let parseData = JSON.parse(query.data);
        switch (parseData.whatDo) {
            case "sendMsg": {
                if (!groups.includes(parseData.id)) {
                    groups.push(parseData.id);
                }
            }
                break;
        }
        console.log(groups);
        console.log();
    });
    bot.on("message", (message, metadata) => {
        // console.log(message);
        // console.log(metadata);

        let text = message.text;
        let photo = message.photo;
        let caption = message.caption;

        let fileId = photo[0].file_id;

        for (let i = 0; i < groups.length; i++) {
            // bot.sendMessage(groups[i], text);
            bot.sendPhoto(groups[i], fileId, {caption: caption});
            // https.get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${groups[i]}&text=${text}`, res => {
            // https.get(`https://api.telegram.org/bot${token}/sendPhoto?chat_id=${groups[i]}&photo=${fileId}`, res => {
            //     console.log('sended');
            // });
        }

    });
});

// Help
bot.onText(/\/help/, routes.help);
