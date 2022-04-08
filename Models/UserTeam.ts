import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../db'
import { TeamModel } from './Team'
import { UserModel } from './User'

export interface UserTeamAttributes{
    id?: number
    team_id: number
    user_id: number
}

interface UserTeamInstance
    extends Model<UserTeamAttributes>,
        UserTeamAttributes{}

export const UserTeamModel = sequelize.define<UserTeamInstance>('user_team', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    team_id: {type: DataTypes.INTEGER},
    user_id: {type: DataTypes.INTEGER}
}, {freezeTableName: true, createdAt: false, updatedAt: false})

UserTeamModel.belongsTo(TeamModel, {targetKey: 'id', foreignKey: 'team_id'})
UserTeamModel.belongsTo(UserModel, {targetKey: 'id', foreignKey: 'user_id'})