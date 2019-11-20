const database = require('../../database').getInstance();

module.exports = async (chat_id) => {
    try {
        const ChatModel = database.getModel('Chat');
        let result = await ChatModel.destroy({where: {chat_id}});
    } catch (e) {
        console.log(e.message);
    }
};
