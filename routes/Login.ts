import {Router, Request, Response} from 'express'
import * as crypto from "crypto";
import { LoginModel } from '../Models/Login';

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
                res.json({result: result})
            }else {
                res.json({auth: false, result: "Incorrect Username or Password"})
            }
        }
    }catch (e){
        console.log(e)
    }

})

export default router