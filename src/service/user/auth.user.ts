import{people,memberOfprojects} from '../../model/user'
import * as bcrypt from 'bcrypt'
import {project, projects} from '../../model/project'
const createUser=(username:string,password:string,email:string,dateOfBirth:string):Promise<people>=>{
      const newUser=new people(username,"new member",password)
      newUser.email=email
      newUser.dateOfBirth=new Date(dateOfBirth)
      return Promise.resolve(newUser)
}

const userLogin=(username:string,password:string ):Promise<people>|Error=>{
     try{
         const foundUser=memberOfprojects.find(e=>e.name===username)
         if(!foundUser) {throw "khong có tên người dùng"}else{
            if(bcrypt.compareSync(password,foundUser.password||"")){
                 return Promise.resolve(foundUser)
            }else{
                throw "sai mật khẩu"
            }
         }
     }catch(err){
          return new Error(err)
     }
}

const findProjects=async (username:string ):Promise<project[]|Error>=>{
    const projectUserIntended=await projects.filter(e=>{  e.number_of_people?.map(member=> member.name===username) })
         if(projectUserIntended.length>0){
            console.log(projectUserIntended.length)
          return Promise.resolve(projectUserIntended)
         }
          return new Error('KHONG CÓ TRONG DỰU ÁN NÀO ')
}
export {createUser,userLogin,findProjects}