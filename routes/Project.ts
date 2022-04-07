import {Router, Request, Response} from 'express'
import { ProjectAttributes, ProjectModel } from '../Models/Project'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
    const {deal_id, investor_id}: ProjectAttributes = req.body

    const date = new Date().toLocaleString()

    await ProjectModel.create({deal_id: deal_id, investor_id: investor_id, date: date})
    res.json({message: "Project created"})
})

router.get('/all', async (req: Request, res: Response) => {
    try{
        const projects = await ProjectModel.findAll()
        res.json({projects: projects})
    }catch(e){
        console.log(e);
    }
})

router.get('/', async (req: Request, res: Response) => {
    const {id}: ProjectAttributes = req.body

    const project = await ProjectModel.findOne({where: {id: id}})

    res.json({project: project})
})

export default router