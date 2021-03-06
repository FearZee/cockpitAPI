import { Model, DataTypes} from 'sequelize'
import { sequelize } from '../db'

export interface InvestorAttributes {
    id?: number
    name: string
    address: string
}

interface InvestorInstance
    extends Model<InvestorAttributes>,
        InvestorAttributes {}


export const InvestorModel = sequelize.define<InvestorInstance>('investor', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    address: {type: DataTypes.STRING}
}, {freezeTableName: true, createdAt: false, updatedAt: false})