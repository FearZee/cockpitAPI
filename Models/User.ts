import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../db'

interface UserAttributes{
    id: number
    name: string
}

interface UserInstance
    extends Model<UserAttributes>,
        UserAttributes{}

export const UserModel = sequelize.define<UserInstance>('user',  {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    name: {type: DataTypes.STRING}
})