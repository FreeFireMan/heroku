const database = require('../../database').getInstance();

module.exports = async (userId) => {
    try {
        const UserModel = database.getModel('User');
        let findedUser = await UserModel.findOne({where: {data_id: userId}});
        return findedUser.dataValues;
    } catch (e) {
        console.log(e.message);
    }
};
