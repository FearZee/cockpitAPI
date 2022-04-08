import { Router, Response, Request } from "express"
import { RoleModel } from "../Models/Role"
import { TeamModel } from "../Models/Team"
import { UserAttributes, UserModel } from "../Models/User"
import { UserRoleAttributes, UserRoleModel } from "../Models/UserRole"
import { UserTeamAttributes, UserTeamModel } from "../Models/UserTeam"
import { TaskColsModel } from "../Models/TaskColumns"
import { TaskModel } from "../Models/Task"
import { LoginModel } from "../Models/Login"

const router = Router()

interface ReqBod {
    user_id: number
    team_id: number
}

router.post('/add', async (req: Request, res: Response) => {
    const {name}: UserAttributes = req.body
    const {role_id}: UserRoleAttributes = req.body
    const {team_id}: UserTeamAttributes = req.body

    const newUser = await UserModel.create({name: name})

    const usernameTemp = newUser.name.split(' ')

    const username = `${usernameTemp[0]}.${usernameTemp[1]}`

    const TaskColumns = ['Backlog', 'In Progress', 'Done']

    await LoginModel.create({
        username: username, 
        password: 'cnwHumhIZ+KY8B7EMQ90sg+GOx6dFEQSB6ojMuCKGxg=',
        user_id: newUser.id!
    })

    const date = new Date().toLocaleDateString()

    await UserRoleModel.create({
        role_id: role_id, 
        user_id: newUser.id!,
        date_of_creation: date
    })

    TaskColumns.map(async (col) => {
        await TaskColsModel.create({name: col, user_id: newUser.id!})
    })

    // Add User to Team ?
    await UserTeamModel.create({team_id: team_id, user_id: newUser.id!})

    res.json({message: "User created."})
    
})

router.post('/addteam', async (req: Request, res:Response) => {
    
    const {user_id, team_id}: ReqBod = req.body
    await UserTeamModel.create({user_id: user_id, team_id: team_id})

    const user = await UserModel.findOne({where: {id: user_id}})
    const team = await TeamModel.findOne({where: {id: team_id}})

    res.json({added: true, user: user, team:team})
})

router.get('/', async (req: Request, res: Response) => {
    const {id}: UserAttributes = req.body
    const result = await UserRoleModel.findAll({
        include: [{model: UserModel}, {model: RoleModel}],
        where: {user_id: id}
    })

    res.json({result})
}) 

router.get('/tasks', async (req: Request, res: Response) => {
    try{
        const {id}:UserAttributes = req.body

        const test = await TaskColsModel.findAll({
            where: {user_id: id}
        })

        let testRes = {}

        if(test){
            for await (const column of test){
                const test2 = await TaskModel.findAll({ where: { task_column_id: column.id, is_completed: false } });

                const testResTemp: Object = {
                    [column.id ? column.id : 1]: {
                        name: column.name,
                        items: test2
                    }
                };

                testRes = Object.assign(testRes, testResTemp)
            }       
            res.json(testRes)
        }
    }catch(e){
        console.log(e);
    }
})

export default router