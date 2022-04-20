import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

 const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token']

    if(!token){
        res.send('We need a token!')
    }else{
        jwt.verify(token, "jwtSecret", (err: Error, decoded: any) => {
            if(err){
                res.json({auth: false, message: 'U failed to authenticate'})
            }else {
                req.body.id = decoded
                
                next()
            }
        })
    }
}

module.exports = verifyJWT;