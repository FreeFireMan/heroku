const database = require('../../database').getInstance();

module.exports = async () => {
    try {
        const UserModel = database.getModel('User');
        let findedUser = await UserModel.findAll({where: {is_admin: true}});
        let adminsAre = 'Admins are:\n';
        for (let i = 0; i < findedUser.length; i++) {
            adminsAre += `${i + 1}) *${findedUser[i].dataValues.first_name ? findedUser[i].dataValues.first_name : ''} ${findedUser[i].dataValues.last_name ? findedUser[i].dataValues.last_name : ''}* _${findedUser[i].dataValues.phone_number ? findedUser[i].dataValues.phone_number : ''}_\n`;
        }
        return adminsAre;
    } catch (e) {
        console.log(e.message);
    }
};
