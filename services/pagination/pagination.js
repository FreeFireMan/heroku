const database = require('../../database').getInstance();

module.exports = async (page, lim, modelName) => {
    try {
        const Model = database.getModel(modelName);
        const count = await Model.count();
        const pageCount = Math.ceil(count / lim);
        const pageArray = await Model
            .findAll({
                limit: lim,
                offset: ((page - 1) * lim)
            })
            .map(value => value.dataValues);

        if (pageArray) {
            return {
                pageCount: pageCount,
                objects: pageArray
            }
        }
    } catch (e) {
        console.log(e.message);
    }
};
