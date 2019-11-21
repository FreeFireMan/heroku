let {bot} = require('../settingsBot');

module.exports = (msg) => {
    if (msg.chat.type === 'private') {
        let message = 'Це бот <b>OWU</b>\n' +
            'У даного бота доступні такі <b>команди</b>:\n' +
            '/regme - Команда для реєстрації користувача\n' +
            '/adminadd <i>380631234567</i> - Команда для надання користувачу прав адміністратора\n' +
            '/admindel - Команда для видалення прав адміністратора\n' +
            '/adminshow - Команда для показу усіх адміністраторів\n' +
            '/chatreg - Команда для реєстрації чату\n' +
            '/chatdel - Команда для видалення чату\n';

        bot.sendMessage(msg.chat.id, message, {
            parse_mode: "HTML",
        });
    }
};
