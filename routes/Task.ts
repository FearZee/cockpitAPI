import { Router, Request, Response } from "express";
import { ProjectModel } from "../Models/Project";
import { TaskAttributes, TaskModel } from "../Models/Task";
import { TaskColsAttributes, TaskColsModel } from "../Models/TaskColumns";
import { TopicModel } from "../Models/Topic";
import { UserModel } from "../Models/User";

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
        author_id: author_id,
        task_column_id: 1
    })

    res.json({message: "Task created"})
})

router.get('/', async (req: Request, res: Response) => {
    try{
        const {id}: TaskAttributes = req.body

        const task = await TaskModel.findOne({ 
            include: [{model: UserModel}, {model: ProjectModel}, {model: TopicModel}],
            where:{id: id}
        })

        res.json({task:task})
    }catch(e){
        console.log(e);
    }
})

router.post('/setcompleted', async (req:Request, res: Response) => {
    const {id, is_completed}: TaskAttributes = req.body
    

    await TaskModel.update({is_completed: is_completed}, {where: {id: id}})
    

    res.json({message: `Task ${id} is completed`})
})

// TODO middleware that check if user_role is xyz
router.post('/edit', async (req: Request, res: Response) => {
    const {
        id, 
        name, 
        desc, 
        duration, 
        priority, 
        user_id, 
        project_id,
        topic_id,
    }: TaskAttributes = req.body

    await TaskModel.update({
        name: name,
        desc: desc,
        duration: duration,
        priority: priority,
        user_id: user_id,
        project_id: project_id,
        topic_id: topic_id
    }, {where: {id: id}})
})

router.post('/changecolumn', async (req: Request, res: Response) => {
    const {name, user_id}: TaskColsAttributes = req.body
    const {id}: TaskAttributes = req.body

    const column = await TaskColsModel.findOne({where: {name: name}})
    if(column){
        TaskModel.update({task_column_id: column.id}, {where: {id: id}})
    }
    res.json({message: 'Task updated.'})
})

export default router