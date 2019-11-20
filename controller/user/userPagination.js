const fs = require('fs-extra');
const path = require('path');
const uuid = require('uuid').v1();

const database = require('../../database').getInstance();

module.exports = async (page, lim) => {
    try {
        const UserModel = database.getModel('User');
        const count = await UserModel.count({});
        const pageCount = Math.ceil(count / lim);
        const result = await UserModel.findAll({limit: lim, offset: ((page - 1) * lim)});
        let pageArray = result.map(item => {
            return item.dataValues;
        });
        if (pageArray) {
            return {
                pageCount: pageCount,
                objects: pageArray
            };
        } else {
            console.log(`Something went wrong in pagination `);
        }
    } catch (e) {
        console.log(e.message);
    }
};
