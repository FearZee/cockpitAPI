import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../db'

export interface RoleAttributes{
    id?: number
    name: string
}

interface RoleInstance
    extends Model<RoleAttributes>,
        RoleAttributes{}

export const RoleModel = sequelize.define<RoleInstance>('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
}, {freezeTableName: true, createdAt: false, updatedAt: false})