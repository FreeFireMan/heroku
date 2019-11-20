let TelegramBot = require('node-telegram-bot-api');
let token = '1006075112:AAFGjaFlDEFcOkgNmlJN4CIohcANkv-dqD8';
const bot = new TelegramBot(token, {polling: true});

module.exports = {
    bot
};
