import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../db'
import { ProjectModel } from './Project'

interface TopicAttributes{
    id: number
    name: string
    date_of_creation: string
    project_id: number
}

interface TopicInstance 
    extends Model<TopicAttributes>,
        TopicAttributes {}

export const TopicModel = sequelize.define<TopicInstance>('topic', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    name: {type: DataTypes.STRING},
    date_of_creation: {type: DataTypes.STRING},
    project_id: {type: DataTypes.INTEGER}
})
TopicModel.belongsTo(ProjectModel, {targetKey: 'id', foreignKey: 'project_id'})