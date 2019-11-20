module.exports = (msg) => {
    let message = 'Це бот <b>OWU</b>\n' +
        'У даного бота доступні такі <b>команди</b>:\n' +
        '/regme - Команда для реєстрації юзера\n' +
        '/adminadd <i>380631234567</i> - Команда для надання користувачу прав адміністратора\n' +
        '/admindel - Команда для видалення прав адміністратора користувачу\n' +
        '/adminshow - Команда для показу усіх адміністраторів\n' +
        '/chatreg - Команда для реєстрації чату\n';

    bot.sendMessage(msg.chat.id, message, {
        parse_mode: "HTML",
    });
};
