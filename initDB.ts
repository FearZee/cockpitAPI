import { LoginModel } from "./Models/Login"
import { UserModel } from "./Models/User"

const DBMigrate = require('db-migrate')

export const initDB = async () => {
    const dbmigrate = DBMigrate.getInstance(true)
    await dbmigrate.up()

    interface tempUserAttribues{
        name: string
    }

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