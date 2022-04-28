import { CommentsModel } from "./Models/Comments"
import { DealModel } from "./Models/Deal"
import { InvestorModel } from "./Models/Investor"
import { LoginModel } from "./Models/Login"
import { ProjectModel } from "./Models/Project"
import { RoleModel } from "./Models/Role"
import { TaskModel } from "./Models/Task"
import { TaskColsModel } from "./Models/TaskColumns"
import { TeamModel } from "./Models/Team"
import { TopicModel } from "./Models/Topic"
import { UserModel } from "./Models/User"
import { UserRoleModel } from "./Models/UserRole"
import { UserTeamModel } from "./Models/UserTeam"

const DBMigrate = require('db-migrate')

export const initDB = async () => {
    // const dbmigrate = DBMigrate.getInstance(true)
    // await dbmigrate.up()

    // interface tempUserAttribues{
    //     name: string
    // }

    await UserModel.sync()
    await TopicModel.sync()
    await InvestorModel.sync()
    await DealModel.sync()
    await ProjectModel.sync()
    await TaskColsModel.sync()
    await TaskModel.sync()

 
    await CommentsModel.sync()
    await LoginModel.sync()
    await RoleModel.sync()
    await TeamModel.sync()
    await UserRoleModel.sync()
    await UserTeamModel.sync()

    const user = await UserModel.create({name: "WebDev"})
    await LoginModel.create({
        username: 'dev',
        password: 'cnwHumhIZ+KY8B7EMQ90sg+GOx6dFEQSB6ojMuCKGxg=',
        user_id: user.id!
    })
    /*const tempUser = {
        id: 2,
        name: "Developer2"
    }

    const tempLogin = {
        id: 1,
        username: 'dev',
        password: 'n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=',
        user_id: 1
    }

    await LoginModel.create(tempLogin)
    
    await UserModel.create(tempUser, {
        ignoreDuplicates: true
    })*/

}