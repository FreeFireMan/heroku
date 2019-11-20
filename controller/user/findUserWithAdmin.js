const database = require('../../database').getInstance();

module.exports = async (userId) => {
    try {
        const UserModel = database.getModel('User');
        let findedUser = await UserModel.findOne({where: {data_id: userId, is_admin: true}});
        if (findedUser.data_id !== userId) {
            throw new Error('error');
        }
        return true;
    } catch (e) {
        console.log(e.message);
    }
};
