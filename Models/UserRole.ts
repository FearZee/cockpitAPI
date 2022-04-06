import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../db'
import { UserModel } from './User'
import { RoleModel } from './Role'

interface UserRoleAttributes{
    id: number
    role_id: number
    user_id: number
    date_of_creation: string
}

interface UserRoleInstance
    extends Model<UserRoleAttributes>,
        UserRoleAttributes{}

export const UserRoleModel = sequelize.define<UserRoleInstance>('user_role',{
    id: {type: DataTypes.INTEGER, primaryKey: true},
    role_id: {type: DataTypes.INTEGER},
    user_id: {type: DataTypes.INTEGER},
    date_of_creation: {type: DataTypes.STRING}
})

UserRoleModel.belongsTo(RoleModel, {targetKey: 'id', foreignKey: 'role_id'})
UserRoleModel.belongsTo(UserModel, {targetKey: 'id', foreignKey: 'user_id'})