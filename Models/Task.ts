import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../db'
import { ProjectModel } from './Project'
import { TopicModel } from './Topic'
import { UserModel } from './User'

export interface TaskAttributes {
    id?: number
    name: string
    desc: string
    duration: string
    priority: number
    progress: number
    user_id: number | null
    project_id: number | null
    topic_id: number | null
    is_completed: boolean
    author_id: number
}

interface TaskInstance
    extends Model<TaskAttributes>,
        TaskAttributes{}

export const TaskModel = sequelize.define<TaskInstance>('task', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
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
}, {freezeTableName: true, createdAt: false, updatedAt: false})

TaskModel.belongsTo(UserModel, {targetKey: 'id', foreignKey: 'user_id'})
TaskModel.belongsTo(ProjectModel, {targetKey: 'id', foreignKey: 'project_id'})
TaskModel.belongsTo(TopicModel, {targetKey: 'id', foreignKey: 'topic_id'})
TaskModel.belongsTo(UserModel, {targetKey: 'id', foreignKey: 'author_id'})