import {Router, Request, Response} from 'express'
import { request } from 'http'
import { TaskModel } from '../Models/Task'
import {TeamModel, TeamAttributes} from '../Models/Team'
import { UserModel } from '../Models/User'
import { UserTeamAttributes, UserTeamModel } from '../Models/UserTeam'

const router = Router()

router.post('/',async (req:Request, res: Response) => {
    const {name}: TeamAttributes = req.body

    await TeamModel.create({name: name})
    res.json({created: true, name: name})
    
})

router.get('/', async (req: Request, res: Response) => {
    try{
        const teams = await TeamModel.findAll()

        res.json({teams: teams})
    }catch(e){
        console.log(e)
    }
})

router.get('/users', async(req:Request, res: Response) => {
    interface ReqBod{
        id?: number
        name?: string
    }
    const {id, name}:ReqBod = req.body
    

    if(id){
       const users = await UserTeamModel.findAll({where: {team_id: id}})
       res.json({users: users})
    }
    if(name){
        const team = await TeamModel.findOne({where: {name: name}})
        if(team){
            const users = await UserTeamModel.findAll({where:{team_id: team.id}})
            res.json({users: users})
        }
    }
})

router.post('/users/names', async(req:Request, res: Response) => {
    interface ReqBod{
        id?: number
        name?: string
    }
    const {id, name}:ReqBod = req.body
    
    let usersObject = []

    if(id){
       const users = await UserTeamModel.findAll({where: {team_id: id}})
       for await (const user of users){
           const userName = await UserModel.findOne({where:{id: user.user_id}})
           usersObject.push(userName)
       }
       console.log(usersObject);
       
       
       res.json({users: usersObject})
    }
    if(name){
        const team = await TeamModel.findOne({where: {name: name}})
        if(team){
            const users = await UserTeamModel.findAll({where:{team_id: team.id}})
            res.json({users: users})
        }
    }
})

router.post('/alltasks', async (req: Request, res: Response) => {
    const {team_id}: UserTeamAttributes = req.body

    const allUsers = await UserTeamModel.findAll({where: {team_id: team_id}})

    console.log(JSON.stringify(allUsers, null, 2));
    

    const testRes = {
        [1]: {
            name: 'Backlog',
            items: []
        },
        [2]: {
            name: 'In Progress',
            items: []
        },
        [10]: {
            name: 'Done',
            items: []
        },
    }

    for await(const user of allUsers){
        
        const res1 = await TaskModel.findAll({where:{user_id: user.user_id, task_column_id: 1, is_completed: false}, include: [{model: UserModel}],})
        const res2 = await TaskModel.findAll({where:{user_id: user.user_id, task_column_id: 2, is_completed: false}, include: [{model: UserModel}],})
        const res3 = await TaskModel.findAll({where:{user_id: user.user_id, task_column_id: 10, is_completed: false}, include: [{model: UserModel}],})

        console.log(JSON.stringify(res1, null, 2));
        

        res1.forEach((item) => {
             // @ts-ignore
            return testRes[1].items.push(item)
        })

        res2.forEach((item) => {
             // @ts-ignore
            return testRes[2].items.push(item)
        })
        res3.forEach((item) => {
             // @ts-ignore
            return testRes[10].items.push(item)
        })

    }

    console.log(testRes)
    res.json(testRes)


    
})

export default router