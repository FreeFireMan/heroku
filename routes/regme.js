let {bot} = require('../settingsBot');
let {user} = require('../controller');

module.exports = (msg) => {
    if (msg.chat.type === 'private') {

        let option = {
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
                await user.createUser(user_id, first_name, last_name, phone_number);
                bot.sendMessage(msg.chat.id,
                    `Thank you ${first_name ? first_name : ''} ${last_name ? last_name : ''} with phone ${phone_number ? phone_number : ''} for registration!`,
                    {
                        reply_markup: {
                            remove_keyboard: true
                        }
                    }
                );
            });

            bot.once("text", () => {
                bot.sendMessage(msg.chat.id, `Registration is cancel`,
                    {
                        reply_markup: {
                            remove_keyboard: true
                        }
                    })
            });
        });
    }
};
