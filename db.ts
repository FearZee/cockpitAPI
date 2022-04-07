import {Sequelize} from 'sequelize'

// export const sequelize = new Sequelize('postgres://postgres:changeme@192.168.250.4:30300/postgres')
export const sequelize = new Sequelize('postgres://postgres:changeme@localhost:5433/cockpit')

// module.exports = sequelize