import { Router, Request, Response } from "express";
import { InvestorAttributes, InvestorModel } from "../Models/Investor";

const router = Router()

router.post('/', async (req: Request, res: Response) => {
    const {name, address}: InvestorAttributes = req.body

    await InvestorModel.create({name:name, address: address})
    res.json({message: "Investor created"})
})

router.get('/',async (req:Request, res: Response) => {
    const {id, name}: InvestorAttributes = req.body

    if(id){
        const investor = await InvestorModel.findOne({where:{id: id}})
        res.json({investor: investor})
    }
})

router.get('/all', async (req: Request, res: Response) => {
    try{
        const allInvestors = await InvestorModel.findAll()
        res.json({investors: allInvestors})
    }catch(e){
        console.log(e);
    }
})

export default router