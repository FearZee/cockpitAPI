import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../db'

interface RoleAttributes{
    id: number
    name: string
}

interface RoleInstance
    extends Model<RoleAttributes>,
        RoleAttributes{}

export const RoleModel = sequelize.define<RoleInstance>('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    name: {type: DataTypes.STRING}
})