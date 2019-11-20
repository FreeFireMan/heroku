const database = require('../../database').getInstance();

module.exports = async (userId) => {
    try {
        const UserModel = database.getModel('User');
        let findedUser = await UserModel.findOne({where: {data_id: userId}});
        if (findedUser.data_id !== userId) {
            throw new Error('error')
        }
        console.log('finded');
        return true;
    } catch (e) {
        console.log(e.message);
    }
};
