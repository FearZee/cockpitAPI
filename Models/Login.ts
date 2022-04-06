import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../db'
import { UserModel } from './User'

interface LoginAttributes{
    id: number
    username: string
    password: string
    user_id: number
}

interface LoginInstance
    extends Model<LoginAttributes>,
        LoginAttributes{}

export const LoginModel = sequelize.define<LoginInstance>('login', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    username: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    user_id: {type: DataTypes.INTEGER}
})
LoginModel.belongsTo(UserModel, {foreignKey: 'id', targetKey: 'user_id'})