
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect:'sqlite',
    storage: "./sqlite/bugs.db"
})

// sequelize.sync({alter:true})
//     .then(() => {
//         console.log("Tables created.")
//     })

module.exports=sequelize;