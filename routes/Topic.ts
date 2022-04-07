import { Router, Request, Response } from "express";
import { TopicAttributes, TopicModel } from "../Models/Topic";

const router = Router()

router.post('/', async (req: Request, res: Response) => {
    const {name, project_id}: TopicAttributes = req.body

    const date = new Date().toLocaleDateString()

    await TopicModel.create({name: name, project_id: project_id, date_of_creation: date})

    res.json({message: "Topic created"})
})

router.get('/all', async (req: Request, res: Response) => {
    const topics = await TopicModel.findAll()

    res.json({topics: topics})
})

router.get('/', async (req: Request, res: Response) => {
    try{
        const {id}: TopicAttributes = req.body

        const topic = await TopicModel.findOne({where: {id: id}})

        res.json({topic: topic})
    }catch(e){
        console.log(e);
    }
})

export default router
