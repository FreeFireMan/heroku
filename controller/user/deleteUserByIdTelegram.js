const database = require('../../database').getInstance();

module.exports = async (user_id) => {
    try {
        const UserModel = database.getModel('User');
        let result = await UserModel.destroy({where: {data_id: user_id}});
    } catch (e) {
        console.log(e.message);
    }
};
