import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../db'
import { UserModel } from './User'
import { TaskModel } from './Task'

interface CommentsAttributes{
    id: number
    content: string
    date: string
    user_id: number
    task_id: number
}

interface CommentsInstance
    extends Model<CommentsAttributes>,
        CommentsAttributes{}

export const CommentsModel = sequelize.define<CommentsInstance>('comments', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    content: {type: DataTypes.INTEGER},
    date: {type: DataTypes.STRING},
    user_id: {type: DataTypes.INTEGER},
    task_id: {type: DataTypes.INTEGER}
})

CommentsModel.belongsTo(UserModel, {targetKey: 'id', foreignKey: 'user_id'})
CommentsModel.belongsTo(TaskModel, {targetKey: 'id', foreignKey: 'task_id'})