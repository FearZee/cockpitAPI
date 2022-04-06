import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../db'
import { ProjectModel } from './Project'
import { TopicModel } from './Topic'
import { UserModel } from './User'

interface TaskAttributes {
    id: number
    name: string
    desc: string
    duration: string
    priority: number
    progress: number
    user_id: number
    project_id: number
    topic_id: number
    is_completed: boolean
    author_id: number
}

interface TaskInstance
    extends Model<TaskAttributes>,
        TaskAttributes{}

export const TaskModel = sequelize.define<TaskInstance>('task', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    name: {type: DataTypes.STRING},
    desc: {type: DataTypes.STRING},
    duration: {type: DataTypes.STRING},
    priority: {type: DataTypes.INTEGER},
    progress: {type: DataTypes.INTEGER},
    user_id: {type: DataTypes.INTEGER},
    project_id: {type: DataTypes.INTEGER},
    topic_id: {type: DataTypes.INTEGER},
    is_completed: {type: DataTypes.BOOLEAN},
    author_id: {type: DataTypes.INTEGER}
})

TaskModel.belongsTo(UserModel, {foreignKey: 'id', targetKey: 'user_id'})
TaskModel.belongsTo(ProjectModel, {foreignKey: 'id', targetKey: 'project_id'})
TaskModel.belongsTo(TopicModel, {foreignKey: 'id', targetKey: 'topic_id'})
TaskModel.belongsTo(UserModel, {foreignKey: 'id', targetKey: 'author_id'})