import { Model, DataTypes} from 'sequelize'
import { sequelize } from '../db'

interface DealAttributes {
    id: number
    name: string
    opening_date: string
    closing_date: string | null
    opener: number
}

interface DealInstance
    extends Model<DealAttributes>,
        DealAttributes {}


export const DealModel = sequelize.define<DealInstance>('deal', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    name: {type: DataTypes.STRING},
    opening_date: {type: DataTypes.STRING},
    closing_date: {type: DataTypes.STRING},
    opener: {type: DataTypes.INTEGER},
}, {freezeTableName: true, createdAt: false, updatedAt: false})