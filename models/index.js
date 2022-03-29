const dbConfig = require('../config/dbConfig.js');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: 0,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log("Database Connected")
    }).catch(err => {
        console.log("Error occur in connection " + err)
    })

const db = {}

db.Sequlize = Sequelize
db.sequelize = sequelize


// In Below Model haru xa jun mero app chahine
db.registernewTeamMember = require('./registernewTeamMember.js')(sequelize, DataTypes)
db.admin = require('./admindetails.js')(sequelize, DataTypes)
db.client = require('./client.js')(sequelize, DataTypes)


db.addnewclient = require('./client/newclient.js')(sequelize, DataTypes)


db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Re-sync Done")
    }).catch(err => {
        console.log(" Error occured in resync" + err)
    })


module.exports = db