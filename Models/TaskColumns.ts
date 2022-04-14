import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../db'
import { TaskModel } from './Task'
import { UserModel } from './User'

export interface TaskColsAttributes{
    id?: number
    name: string
    user_id: number
}

export interface TaskColsInstance
    extends Model<TaskColsAttributes>,
        TaskColsAttributes{}

export const TaskColsModel = sequelize.define<TaskColsInstance>('task_columns',  {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    user_id: {type: DataTypes.INTEGER}
}, {freezeTableName: true, createdAt: false, updatedAt: false})

TaskColsModel.belongsTo(UserModel, {targetKey: 'id', foreignKey: 'user_id'})