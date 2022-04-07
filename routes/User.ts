import { Router, Response, Request } from "express"
import { RoleModel } from "../Models/Role"
import { TeamModel } from "../Models/Team"
import { UserModel } from "../Models/User"
import { UserRoleModel } from "../Models/UserRole"
import { UserTeamModel } from "../Models/UserTeam"

const router = Router()

interface ReqBod {
    user_id: number
    team_id: number
}

router.post('/addteam', async (req: Request, res:Response) => {
    
    const {user_id, team_id}: ReqBod = req.body
    await UserTeamModel.create({user_id: user_id, team_id: team_id})

    const user = await UserModel.findOne({where: {id: user_id}})
    const team = await TeamModel.findOne({where: {id: team_id}})

    res.json({added: true, user: user, team:team})
})

router.get('/', async (req: Request, res: Response) => {
    const result = await UserRoleModel.findAll({
        include: [{model: UserModel}, {model: RoleModel}],
        where: {user_id:1}
    })

    console.log(JSON.stringify(result, null, 2));
})

export default router