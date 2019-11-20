const fs = require('fs-extra');
const path = require('path');
const uuid = require('uuid').v1();

const database = require('../../database').getInstance();

module.exports = async (user_id) => {
    try {
        console.log("deleteUserByIdTelegram :");
        console.log(user_id);
        const UserModel = database.getModel('User');
        let result = await UserModel.destroy({where: {data_id: user_id}});
        if (result) {
            console.log(`User ${user_id} destroyed!!!`);
        } else {
            console.log(`Something went wrong in delete user ${user_id}`);
        }
    } catch (e) {
        console.log(e.message);
    }
};
