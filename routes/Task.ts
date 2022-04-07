import { Router, Request, Response } from "express";
import { TaskAttributes, TaskModel } from "../Models/Task";

const router = Router()

router.post('/', async (req: Request, res: Response) => {
    const {
        name,
        desc,
        duration,
        priority,
        project_id,
        topic_id,
        user_id,
        author_id
    }: TaskAttributes = req.body

    const is_completed: boolean = false

    await TaskModel.create({
        name: name,
        desc: desc,
        duration: duration,
        priority: priority,
        progress: 0,
        user_id: user_id ? user_id : null,
        project_id: project_id ? project_id : null,
        topic_id: topic_id ? topic_id: null,
        is_completed: is_completed,
        author_id: author_id
    })

    res.json({message: "Task created"})
})

router.get('/', async (req: Request, res: Response) => {
    const {id}: TaskAttributes = req.body

    const task = await TaskModel.findOne({where:{id: id}})

    res.json({task:task})
})

export default router