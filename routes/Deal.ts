import { Router, Request, Response, RequestHandler } from "express";
import { DealModel } from "../Models/Deal";

const router = Router()

router.post('/', async (req: Request, res: Response) => {
    interface ReqBody{
        id: number
        name: string
        opener: number
    }
    const {id, name, opener}: ReqBody = req.body

    const openingDate = new Date().toLocaleString()
    const closingDate = null

    await DealModel.create({id: id, name: name, opener: opener, opening_date: openingDate, closing_date: closingDate})

    res.json({message: "Deal created."})
})

router.get('/all', async (req: Request, res: Response) => {
    try{
        const deals = await DealModel.findAll()
        res.json({deals: deals})
    }catch(e){
        console.log(e)
    }
})

router.get('/', async (req: Request, res: Response) => {
    interface ReqBody{
        id: number
    }
    const {id}: ReqBody = req.body

    const deal = await DealModel.findOne({where:{id: id}})
    res.json({deal: deal})
})

export default router