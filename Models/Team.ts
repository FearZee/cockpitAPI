import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../db'

interface TeamAttributes{
    id: number
    name: string
}

interface TeamInstance
    extends Model<TeamAttributes>,
        TeamAttributes{}

export const TeamModel = sequelize.define<TeamInstance>('team', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name: {type: DataTypes.STRING}
}, {freezeTableName: true, createdAt: false, updatedAt: false})