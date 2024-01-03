declare module 'bcrypt';
declare module 'jsonwebtoken'
import { authenticate ,authorizationService,invalidThisToken} from "../../service/auth.admin.service";
import { NextFunction, Request,Response } from "express"
import {showProject,projectDetail,projectAdd,projectEdit,projectDelete,projectAddMember} from '../../service/project.admin.service'

declare module 'express' {
  interface Request {
      user: string;
  }
}
const controllerAdmin={
 login:async(req:Request,res:Response,next:NextFunction)=>{
        const {username,password} = req.body
          authenticate(username,password).then(token=>{
            return res.header('Authorization', token).status(200).send({ message: "Đăng nhập thành công" })
          }).catch(err=>{
            return res.status(500).json({message:err})
          } )
  },
 authorizeMiddleware:async(req:Request,res:Response,next:NextFunction)=>{
    const {authorization} =  req.headers
    const {username}=req.params
      if(authorization){
        try {
         const user=await authorizationService(authorization.toString(),username)
         req.user=user
         return next()
        }catch(err){
         return  res.status(300).json({Error:"tài khoản đăng nhập không hợp lệ","Details":err.message})
        }
      }else{
        return res.status(300).json({Error:"Chưa đăng nhập"})
      }
},
 logout:async(req:Request,res:Response,next:NextFunction)=>{
  const {authorization} =  req.headers
  const {username}=req.params
  if(authorization){
    try {
      invalidThisToken(username,authorization)
     return res.status(200).json({Message:"tài khoản đăng xuât hợp lệ"})
    }catch(err){
     return  res.status(300).json({Error:"tài khoản đăng nhập không hợp lệ"})
    }
  }else{
    return res.status(300).json({Error:"Chưa đăng nhập"})
  }
 },
 showProjectsController:(req:Request,res:Response,next:any)=>{
       const list=  showProject()
       return res.status(200).json(list) 
    },
 projectDetailsController:(req:Request,res:Response,next:any)=>{
    try{
       const project=projectDetail(req.params.id)
        return res.status(200).json(project) 
      }catch(err){
        return res.status(500).json({Error:err.message}) 
    }
 },
  projectAddsController:(req:Request,res:Response,next:any)=>{
  const {name,slug,start_date,end_date}=req.body
  projectAdd(name,slug,start_date,end_date).then((result) => {
     return res.status(200).json(result) 
  }).catch((err) => {
    return res.status(500).json(err.message) 
  });
},
 projectEditsController:(req:Request,res:Response,next:any)=>{
  const oldname=req.params.oldname
  const {name,slug,start_date,end_date}=req.body
  projectEdit(oldname,name,slug,start_date,end_date).then((result) => {
     return res.status(200).json(result) 
  }).catch((err) => {
    return res.status(500).json(err.message) 
  });
},
 projectDeleteController:async(req:Request,res:Response,next:any)=>{
  const {name}=req.params
  try{
     const data=await projectDelete(name)
     res.status(200).json(data)
  }catch(err){
    res.status(500).json({Error:err})
  }
 
},

projectAddPeople:async(req:Request,res:Response,next:any)=>{
   const {name,username,role}=req.body
   try{
     const  project=await projectAddMember(name,username,role)
     res.status(200).json({message:"Thêm thành công" ,project})
   }catch(err){
    res.status(200).json({Error:err.message})
   }
   

}
}
export {controllerAdmin}