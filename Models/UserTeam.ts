import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../db'
import { TeamModel } from './Team'
import { UserModel } from './User'

interface UserTeamAttributes{
    id: number
    team_id: number
    user_id: number
}

interface UserTeamInstance
    extends Model<UserTeamAttributes>,
        UserTeamAttributes{}

export const UserTeamModel = sequelize.define<UserTeamInstance>('user_team', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    team_id: {type: DataTypes.INTEGER},
    user_id: {type: DataTypes.INTEGER}
})

UserTeamModel.belongsTo(TeamModel, {foreignKey: 'id', targetKey: 'team_id'})
UserTeamModel.belongsTo(UserModel, {foreignKey: 'id', targetKey: 'user_id'})