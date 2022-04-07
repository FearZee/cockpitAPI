import { Model, DataTypes} from 'sequelize'
import { sequelize } from '../db'
import { DealModel } from './Deal'
import { InvestorModel } from './Investor'

export interface ProjectAttributes {
    id?: number
    deal_id: number
    investor_id: number
    date: string
}

interface ProjectInstance
    extends Model<ProjectAttributes>,
        ProjectAttributes {}


export const ProjectModel = sequelize.define<ProjectInstance>('project', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    deal_id: {type: DataTypes.INTEGER},
    investor_id: {type: DataTypes.INTEGER},
    date: {type: DataTypes.STRING},
}, {freezeTableName: true, createdAt: false, updatedAt: false})

ProjectModel.belongsTo(DealModel, {targetKey: 'id', foreignKey: 'deal_id'})
ProjectModel.belongsTo(InvestorModel, {targetKey: 'id', foreignKey: 'investor_id'})