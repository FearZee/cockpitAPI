import { Router, Request, Response } from "express";
import { CommentsAttributes, CommentsModel } from "../Models/Comments";

const router = Router()

router.post('/', async (req: Request, res: Response) => {
    const {content, user_id, task_id}: CommentsAttributes = req.body

    const date = new Date().toLocaleDateString()

    await CommentsModel.create({
        content: content,
        date: date,
        user_id: user_id,
        task_id: task_id
    })

    res.json({message: "Comment created"})
})

router.get('/', async (req: Request, res: Response) => {
    const {task_id}: CommentsAttributes = req.body

    const Comments = await CommentsModel.findAll({where: {task_id: task_id}})

    res.json({comments: Comments})
})

export default router