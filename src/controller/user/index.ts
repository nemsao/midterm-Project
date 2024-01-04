import {Request, NextFunction ,Response} from "express";

import {createUser,findProjects}from '../../service/user/auth.user'


const UserController={
 makeNewUser:async(req:Request,res:Response,next:NextFunction)=>{
      const {username,password,email,dateOfBirth}=req.body
      createUser(username,password,email,dateOfBirth).then(e=>res.status(200).json({e})).catch(err=>res.status(300).json({err}))
      
    },

  findUserInProject:(req:Request,res:Response,next:NextFunction)=>{
    const {username}=req.body
    findProjects(username).then(value=>{console.log(value); res.status(200).json(value)}).catch(err=>res.status(300).json({err}))
 }  
}


export {UserController}