declare module 'bcrypt';
declare module 'jsonwebtoken'
import { authenticate ,authorizationService,invalidThisToken} from "../../service/admin/auth.admin.service";
import { NextFunction, Request,Response } from "express"
import {showProject,projectDetail,projectAdd,projectEdit,projectDelete,
        projectAddMember,projectRemoveMember} from '../../service/admin/project.admin.service'

import {listAllMembers,detailsOfMember,deleteMember,editMember} from '../../service/admin/user.admin.service'

import {editType,getAllType,hideThisType} from '../../service/admin/type.admin'

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
   const {project_name,name,role}=req.body
   try{
     const  project=await projectAddMember(project_name,name,role)
     res.status(200).json({message:"Thêm thành công" ,project})
   }catch(err){
    res.status(200).json({Error:err.message})
   }
},
projectRemovePeople:async(req:Request,res:Response,next:NextFunction)=>{
  const {project_name,name}=req.body
  try{
    const  project=await projectRemoveMember(project_name,name)
    res.status(200).json({message:"Loại 1 người ra khỏi dự án  thành công" ,project})
  }catch(err){
   res.status(200).json({Error:err.message})
  }
},


//user managing
 ShowAllMembers:async (req:Request,res:Response,next:NextFunction)=>{
  try{
    const  memberLists=await listAllMembers()
    res.status(200).json({message:"danh sách nhân viên " ,memberLists})
  }catch(err){
   res.status(200).json({Error:err.message})
  }
 },
 memberDetails:async (req:Request,res:Response,next:NextFunction)=>{
  try{
    const {name}=req.params
    const  member=await detailsOfMember(name)
    res.status(200).json({message:"danh sách nhân viên " ,data:member})
  }catch(err){
   res.status(200).json({Error:err.message})
  }
 },
 memberDelete:async (req:Request,res:Response,next:NextFunction)=>{
  try{
    const {name}=req.params
    const  member=await deleteMember(name)
    res.status(200).json({message:"danh sách nhân viên sau khi xoá " ,data:member})
  }catch(err){
   res.status(200).json({Error:err.message})
  }
 },
 memberEdit:async (req:Request,res:Response,next:NextFunction)=>{
  try{
    const {name}=req.params
    const { dateOfBirth,email,status}=req.body
    const  member=await editMember(name,dateOfBirth,email,status)
    res.status(200).json({message:"Thông tin nhân viên sau khi sửa " ,data:member})
  }catch(err){
   res.status(300).json({Error:err.message})
  }
 },



 //type
 seeAllType:async (req:Request,res:Response,next:NextFunction)=>{
   try{
    const  types=await getAllType()
    res.status(200).json({message:"Thông tin cảu các type " ,data:types})
   }catch(err){
    res.status(200).json({Error:err.message})
   }
 },
 editThisType:async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const {name,visible}=req.body
    const editedType=await editType(name,visible)
    res.status(200).json(editedType)
  }catch(err){
    res.status(200).json({Error:err.message})
  }
 },
 hideTheType:async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const {name}=req.body
    const hidedType=await hideThisType(name)
    res.status(200).json(hidedType)
  }catch(err){
    res.status(200).json({Error:err.message})
  }
 },


}
export {controllerAdmin}