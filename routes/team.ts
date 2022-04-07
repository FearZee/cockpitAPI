import {Router, Request, Response} from 'express'
import {TeamModel} from '../Models/Team'
import { UserModel } from '../Models/User'
import { UserTeamModel } from '../Models/UserTeam'

const router = Router()

interface ReqBod{
    id: number
    name: string
}

router.post('/',async (req:Request, res: Response) => {
    const {name, id}: ReqBod = req.body

    await TeamModel.create({id: id,name: name})
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

export default router