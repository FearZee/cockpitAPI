import {Request, RequestHandler, Response, Router} from "express"

const router = Router()

const test: RequestHandler = (req, res) => {
    res.send('Hello from TS v3')
}

router.get('/',test)

export default router