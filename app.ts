import express, {Request, Response, NextFunction} from "express";
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import { initDB } from "./initDB";

import indexRoute from './routes/index'
import LoginRoute from './routes/Login'
import TeamRoute from './routes/team'
import UserRoute from './routes/User'
import DealRoute from './routes/Deal'
import InvestorRoute from './routes/Investor'
import ProjectRoute from './routes/Project'
import TopicRouter from './routes/Topic'
import TaskRouter from './routes/Task'
import CommentsRouter from './routes/Comments'

const app = express()

initDB()


app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

app.use('/', indexRoute)
app.use('/login', LoginRoute)
app.use('/team', TeamRoute)
app.use('/user', UserRoute)
app.use('/deal', DealRoute)
app.use('/investor', InvestorRoute)
app.use('/project', ProjectRoute)
app.use('/topic', TopicRouter)
app.use('/task', TaskRouter)
app.use('/comment', CommentsRouter)

// @ts-ignore
app.use((err: Error, res: Response, req:Request) => {
    res.json({message: err.message})
})


module.exports = app