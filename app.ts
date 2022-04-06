import express, {Request, Response, NextFunction} from "express";
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import indexRoute from './routes/index'

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

app.use('/', indexRoute)

// @ts-ignore
app.use((err: Error, res: Response, req:Request) => {
    res.json({message: err.message})
})


module.exports = app