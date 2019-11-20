const database = require('../../database').getInstance();

module.exports = async (userId, name, surname, phoneNumber) => {
    try {
        const UserModel = database.getModel('User');
        const createdUser = await UserModel.create({
            data_id: userId,
            first_name: name,
            last_name: surname,
            phone_number: phoneNumber
        });
        const createdUserId = createdUser && createdUser.dataValues && createdUser.dataValues.id;
        if (!createdUserId) {
            throw new Error('Some error')
        }
        console.log('created');
    } catch (e) {
        console.log(e.message);
    }
};
