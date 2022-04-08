import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../db'
import { TaskColsModel } from './TaskColumns'

export interface UserAttributes{
    id?: number
    name: string
}

interface UserInstance
    extends Model<UserAttributes>,
        UserAttributes{}

export const UserModel = sequelize.define<UserInstance>('users',  {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
}, {freezeTableName: true, createdAt: false, updatedAt: false})
