const database = require('../../database').getInstance();

module.exports = async (chatId, chatTitle) => {
    try {
        const ChatModel = database.getModel('Chat');
        const createChat = await ChatModel.create({
            chat_id: chatId,
            chat_title: chatTitle
        });
        const createdChatId = createChat && createChat.dataValues && createChat.dataValues.id;
        if (!createdChatId) {
            throw new Error('Some error')
        }
        return true;
    } catch (e) {
        console.log(e.message);
    }
};
