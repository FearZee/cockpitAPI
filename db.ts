import {Sequelize} from 'sequelize'

export const sequelize = new Sequelize('postgres://postgres:changeme@192.168.250.4:30300/postgres')

// module.exports = sequelize