import dotenv from 'dotenv'
import {Sequelize} from "sequelize"
import CardModel from "./repositories/sequelize/CardModel.js"
import UserModel from "./repositories/sequelize/UserModel.js"

dotenv.config()

const dbName = `${process.env.DB_NAME}`
const dbUser = `${process.env.DB_USER}`
const dbPass = `${process.env.DB_PASS}`
const dbHost = `${process.env.DB_HOST}`
const dbPort = parseInt(`${process.env.DB_PORT}`, 10)

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    port: dbPort,
    dialect: "mysql",
    logging: false
})

CardModel.init(sequelize)
UserModel.init(sequelize)

//Associations
CardModel.belongsTo(UserModel, {
    foreignKey: "user_id"
})

sequelize.sync({force: false})