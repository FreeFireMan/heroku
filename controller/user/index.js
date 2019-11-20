const createUser = require('./createUser');
const findUser = require('./findUser');
const permisionAdmin = require('./persmisionAdmin');
const findUserWithAdmin = require('./findUserWithAdmin');
const findAllUserWithAdmin = require('./findAllUsersWithAdmin');
const userPagination = require('./userPagination');
const deleteUserByIdTelegram = require('./deleteUserByIdTelegram');

module.exports = {
    createUser,
    findUser,
    permisionAdmin,
    findUserWithAdmin,
    findAllUserWithAdmin,
    userPagination,
    deleteUserByIdTelegram
};
