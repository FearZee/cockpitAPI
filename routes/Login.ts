import {Router, Request, Response} from 'express'
import * as crypto from "crypto";
import { LoginModel } from '../Models/Login';
import { UserTeamModel } from '../Models/UserTeam';
import { RoleModel } from '../Models/Role';
import { UserRoleModel } from '../Models/UserRole';
import { TeamModel } from '../Models/Team';
const jwt = require('jsonwebtoken')

const verifyJWT = require('../jwtverify')

const router = Router()

interface ReqBod {
    username: string
    password: string
}

const getHashedPassword = (password: string) => {
    const sha256 = crypto.createHash('sha256')
    return sha256.update(password).digest('base64')
}

router.post('/', async (req: Request, res: Response) => {
    try{
        const {username, password}: ReqBod  = req.body;
        const hashed_password = getHashedPassword(password)

        if(username && hashed_password){
            const result = await LoginModel.findOne({where: {username: username, password: hashed_password}})
            if(result !== null){
                const roles = await UserTeamModel.findAll({where: {user_id: result.user_id}, include: [{model: TeamModel},{model: UserRoleModel, include: [{model: RoleModel}]}]})
                console.log(roles);
                
                
                const token = jwt.sign(result.user_id, 'jwtSecret')


                res.json({auth: true, token: token, user_id: result.user_id, roles: roles})
            }else {
                res.json({auth: false, result: "Incorrect Username or Password"})
            }
        }
    }catch (e){
        console.log(e)
    }

})

router.get('/auth', verifyJWT, async (req: Request, res: Response) => {
    console.log(req.body.id);
    try{
        const roles = await UserTeamModel.findAll({where: {user_id: req.body.id}, include: [{model: TeamModel},{model: UserRoleModel, include: [{model: RoleModel}]}]})
                
        const token = jwt.sign(req.body.id, 'jwtSecret')

        res.json({auth: true, token: token, user_id: req.body.id, roles: roles})
    }catch(e){
        res.json({message: "no"})
    }
})

export default router