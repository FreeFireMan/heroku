let db = require('./database').getInstance();
db.setModels();
let https = require('https');

let controller = require('./controller');
let services = require('./services');

let TelegramBot = require('node-telegram-bot-api');
let token = '1006075112:AAFGjaFlDEFcOkgNmlJN4CIohcANkv-dqD8';
// let token = '901231463:AAHMqvWSKVPQLi7ufsJwfQRIkH3Ebnx4GMw';
const chat1 = '-362169744';
const chat2 = '-348731507';

const bot = new TelegramBot(token, {polling: true});

// User Registration in database
bot.onText(/\/regme/, function (msg, match) {
    var option = {
        parse_mode: "Markdown",
        reply_markup: {
            one_time_keyboard: true,
            keyboard: [
                [{
                    text: "My phone number",
                    request_contact: true
                }],
                [{
                    text: "Cancel",
                }]
            ]
        }
    };
    bot.sendMessage(msg.chat.id, "Send your contact?", option).then(() => {
        bot.once("contact", async (msg) => {
            let {user_id, first_name, last_name, phone_number} = msg.contact;
            await controller.user.createUser(user_id, first_name, last_name, phone_number);
            bot.sendMessage(msg.chat.id,
                `Thank you ${first_name} ${last_name} with phone ${phone_number} for registration!`,
                {
                    reply_markup: {
                        remove_keyboard: true
                    }
                }
            );
        });
        bot.once("text", (message, metadata) => {
            bot.sendMessage(msg.chat.id, `Registration is cancel`, {
                reply_markup: {
                    remove_keyboard: true
                }
            })
        });
    });
});

// User Accept to admin
bot.onText(/\/adminadd (.+)/, async (msg, match) => {
    let id = msg.from.id;
    let isAdmin = await controller.user.findUserWithAdmin(id);
    if (isAdmin) {
        let phoneNumber = match[1];
        await controller.user.permisionAdmin(phoneNumber, true);
        bot.sendMessage(msg.chat.id, `Admin ${phoneNumber} added!`);
    } else {
        bot.sendMessage(msg.chat.id, `Sorry, ${msg.from.first_name} ${msg.from.last_name} ${msg.from.phone_number} ${msg.from.username} you don't have permisions on this operation!`);
    }
});

// User Delete from admin
bot.onText(/\/admindel (.+)/, async (msg, match) => {
    let id = msg.from.id;
    let isAdmin = await controller.user.findUserWithAdmin(id);
    if (isAdmin) {
        let phoneNumber = match[1];
        await controller.user.permisionAdmin(phoneNumber, false);
        bot.sendMessage(msg.chat.id, `Admin ${phoneNumber} deleted!`);
    } else {
        bot.sendMessage(msg.chat.id, `Sorry, ${msg.from.first_name} ${msg.from.last_name} ${msg.from.phone_number} ${msg.from.username} you don't have permisions on this operation!`);
    }
});

// All User show admin
bot.onText(/\/adminshow/, async (msg, match) => {
    let id = msg.from.id;
    let isAdmin = await controller.user.findUserWithAdmin(id);
    if (isAdmin) {
        let admins = await controller.user.findAllUserWithAdmin();
        bot.sendMessage(msg.chat.id, admins);
    } else {
        bot.sendMessage(msg.chat.id, `Sorry, ${msg.from.first_name} ${msg.from.last_name} ${msg.from.phone_number} ${msg.from.username} you don't have permisions on this operation!`);
    }
});

// Chat Registration
bot.onText(/\/chatreg/, async (msg, match) => {
    let id = msg.from.id;
    let isAdmin = await controller.user.findUserWithAdmin(id);
    if (isAdmin) {
        const chatId = msg.chat.id;
        const chatTitle = msg.chat.title;
        let chatCreated = await controller.chat.createChat(chatId, chatTitle);
        if (chatCreated) {
            bot.sendMessage(msg.chat.id, `Chat with NAME: "${chatTitle}" and ID: "${chatId}" is created!`);
        } else {
            bot.sendMessage(msg.chat.id, `Chat with NAME: "${chatTitle}" and ID: "${chatId}" is NOT created!`);
        }
    } else {
        bot.sendMessage(msg.chat.id, `Sorry, ${msg.from.first_name} ${msg.from.last_name} ${msg.from.phone_number} ${msg.from.username} you don't have permisions on this operation!`);
    }
});
// Chat Delete
// All Chat Show and send message


//
bot.onText(/\/show/, async (msg, match) => {
    let PAGE = 0;
    let COUNTMESSAGE = 5;
    // let users = await controller.user.findAllUserWithAdmin();
    users = [
        {phone_number: '1'},
        {phone_number: '2'},
        {phone_number: '3'},
        {phone_number: '4'},
        {phone_number: '5'},
        {phone_number: '6'},
        {phone_number: '7'},
        {phone_number: '8'},
        {phone_number: '9'},
        {phone_number: '10'},
        {phone_number: '11'},
        {phone_number: '12'},
        {phone_number: '13'},
        {phone_number: '14'},
        {phone_number: '15'},
        {phone_number: '16'},
        {phone_number: '17'},
        {phone_number: '18'},
        {phone_number: '19'},
        {phone_number: '19'},
        {phone_number: '19'},
    ];

    let settingsTab = [
        {text: `<<`, callback_data: 'prevPage'},
        {text: `>>`, callback_data: 'nextPage'},
    ];

    let multiMatrix = services.paginationChats.multiMatrix(users, COUNTMESSAGE);
    let currentPage = services.paginationChats.pages(multiMatrix, PAGE);

    currentPage.push(settingsTab);
    bot.sendMessage(msg.chat.id, 'Take option', {
        reply_markup: {
            inline_keyboard: currentPage
        }
    });

    bot.on("callback_query",  query => {
        if (query.data === 'nextPage') {
            if ((multiMatrix.length - 1) > PAGE) {
                PAGE++;
                let currentPage = services.paginationChats.pages(multiMatrix, PAGE);
                currentPage.push(settingsTab);
                // First method
                bot.editMessageReplyMarkup(
                    {
                        inline_keyboard: currentPage
                    }, {
                        chat_id: query.message.chat.id,
                        message_id: query.message.message_id
                    }
                );

                // Second method
                // bot.editMessageText('Hello', {
                //     chat_id: query.message.chat.id,
                //     message_id: query.message.message_id,
                //     reply_markup: {
                //         inline_keyboard: currentPage
                //     }
                // });
            }
        }
        if (query.data === 'prevPage') {
            if (PAGE > 0) {
                PAGE--;
                let currentPage = services.paginationChats.pages(multiMatrix, PAGE);
                currentPage.push(settingsTab);
                bot.editMessageReplyMarkup(
                    {
                        inline_keyboard: currentPage
                    }, {
                        chat_id: query.message.chat.id,
                        message_id: query.message.message_id
                    }
                );
            }
        }
    });
});

//


// TEST SOME
let options = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Кнопка 1', callback_data: 'some 1'}],
            [{text: 'Кнопка 2', callback_data: 'data 2'}],
            [{text: 'Кнопка 3', callback_data: 'text 3'}]
        ]
    })
};
bot.onText(/\/owu/, (msg, match) => {
    if (msg.from.id === +'130059762') {
        // if (msg.from.id === +'642077111') {
        let messagePromise = bot.sendMessage(msg.chat.id, 'Take option:', options);
        // text = 'Hello world adada google.com';
        // https.get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat1}&text=${text}`, res => {
        //     console.log('sended');
        // });
        // https.get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat2}&text=Hello+World`, res => {
        //     console.log('sended');
        // });
    }
});
bot.onText(/\/createUser (.+)/, async (msg, match) => {
    let userId = msg.from.id;
    let userIdForRegistration = match[1];
    let answer = await controller.user.findUser(userId);
    // if (msg.from.id === +'130059762') {
    // if (msg.from.id === +'471460368') {
    //     let id = match[1];
    //     user.createUser(id);
    // }
});
