let {bot} = require('../settingsBot');
let {user} = require('../controller');

module.exports = async (msg, match) => {
    if (msg.chat.type === 'private') {
        let id = msg.from.id;
        let isAdmin = await user.findUserWithAdmin(id);
        if (isAdmin) {
            let phoneNumber = match[1];
            await user.permisionAdmin(phoneNumber, true);
            bot.sendMessage(msg.chat.id, `Admin ${phoneNumber} added!`);
        } else {
            bot.sendMessage(msg.chat.id, `Sorry, ${msg.from.first_name ? msg.from.first_name : ''} ${msg.from.last_name ? msg.from.last_name : ''} ${msg.from.phone_number ? msg.from.phone_number : ''} ${msg.from.username ? msg.from.username : ''} you don't have permisions on this operation!`);
        }
    }
};
