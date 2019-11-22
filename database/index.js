const Sequelize = require('sequelize');
const fs = require('fs');
const {resolve} = require('path');

module.exports = (() => {
    let instance;

    function initConnection() {
        const client = new Sequelize('heroku_90fcf2a7e92f604', 'b3e802a3c0d945', 'e7b84223', {
            host: 'eu-cdbr-west-02.cleardb.net',
            dialect: 'mysql'
        });

        const models = {};

        function getModels() {
            fs.readdir('./database/model', (err, file) => {
                file.forEach(file => {
                    const modelName = file.split('.')[0];
                    models[modelName] = client.import(resolve(`./database/model/${modelName}`))
                })
            })
        }

        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName]
        }
    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }

            return instance;
        }
    }
})();
