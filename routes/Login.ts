import {Router, Request, Response} from 'express'
import * as crypto from "crypto";

const router = Router()

interface ReqBod {
    username: string
    password: string
}

const getHashedPassword = (password: string) => {
    const sha256 = crypto.createHash('sha256')
    return sha256.update(password).digest('base64')
}

router.post('/', (req: Request, res: Response) => {
    const {username, password}: ReqBod  = req.body;

    const hashed_password = getHashedPassword(password)

})