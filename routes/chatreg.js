let {bot} = require('../settingsBot');
let controller = require('../controller');

module.exports = async (msg) => {
    let id = msg.from.id;
    let isAdmin = await controller.user.findUserWithAdmin(id);
    const chatId = msg.chat.id;
    if (isAdmin) {
        const chatTitle = msg.chat.title;
        let chatCreated = await controller.chat.createChat(chatId, chatTitle);
        if (chatCreated) {
            bot.sendMessage(chatId, `Chat with NAME: "${chatTitle}" and ID: "${chatId}" is created!`);
        } else {
            bot.sendMessage(chatId, `Chat with NAME: "${chatTitle}" and ID: "${chatId}" is NOT created!`);
        }
    } else {
        bot.sendMessage(chatId, `Sorry, ${msg.from.first_name ? msg.from.first_name : ''} ${msg.from.last_name ? msg.from.last_name : ''} ${msg.from.phone_number ? msg.from.phone_number : ''} ${msg.from.username ? msg.from.username : ''} you don't have permisions on this operation!`);
    }
};
