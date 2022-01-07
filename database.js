
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect:'sqlite',
    storage: "./sqlite/bugs.db"
})

module.exports=sequelize;