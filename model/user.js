const Sequelize = require('sequelize');
const config = require('../config');


const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    port:config.port,
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

const User = sequelize.define('user', {
    email: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    password: Sequelize.STRING(20)
}, {
    timestamps: false
});

module.exports = User;