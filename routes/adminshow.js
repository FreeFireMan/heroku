let {bot} = require('../settingsBot');
let controller = require('../controller');

module.exports = async (msg) => {
    if (msg.chat.type === 'private') {
        let id = msg.from.id;
        let isAdmin = await controller.user.findUserWithAdmin(id);
        if (isAdmin) {
            let admins = await controller.user.findAllUserWithAdmin();

            bot.sendMessage(msg.chat.id, admins, {parse_mode: "Markdown"});
        } else {
            bot.sendMessage(msg.chat.id, `Sorry, ${msg.from.first_name ? msg.from.first_name : ''} ${msg.from.last_name ? msg.from.last_name : ''} ${msg.from.phone_number ? msg.from.phone_number : ''} ${msg.from.username ? msg.from.username : ''} you don't have permisions on this operation!`);
        }
    }
};
