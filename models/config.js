const sequelize = require('sequelize');
require('dotenv').config();

const seq = new Sequelize('school_db', 'root', process.env.PASSWORD, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    }
});

module.exports = seq;