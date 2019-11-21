const database = require('../../database').getInstance();

module.exports = async (userId) => {
    try {
        const Model = database.getModel('Chat');
        let findedChat = await Model.findOne({where: {data_id: userId}});
        return findedChat.dataValues;
    } catch (e) {
        console.log(e.message);
    }
};
