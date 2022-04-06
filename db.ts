import {Sequelize} from 'sequelize'

export const sequelize = new Sequelize('postgres://postgres:changeme@localhost:5432/cockpit')

// module.exports = sequelize