import {memberOfprojects}from '../../model/user'


const  listAllMembers=async():Promise<any>=>{
    if(memberOfprojects[0]){
        return Promise.resolve(memberOfprojects)
    }else{
        return new Error("không có thành viên nào")
    }
    
}
const detailsOfMember=async(name:string):Promise<any>=>{
      return Promise.resolve(memberOfprojects.find(value=>value.name===name))
}

const deleteMember= async(name:string):Promise<any>=>{
    try{
       const foundMember=await memberOfprojects.find(value=>value.name===name)
       if(foundMember){
         const index=memberOfprojects.indexOf(foundMember)
         memberOfprojects.splice(index,1)
         
        return Promise.resolve( memberOfprojects)
    }else{
            throw new Error ("Không tìm thấy Người cần xoá")
        }
      
    }catch(err){
        throw new Error (err)
    }
 }

 const editMember=async(name?:string,dateOfBirth?:string|Date,email?:string,status?:string):Promise<any>=>{
    try{
       const foundMember=await memberOfprojects.find(value=>value.name===name)
       if(foundMember){
         const index=memberOfprojects.indexOf(foundMember)
          if (dateOfBirth){dateOfBirth=new Date(dateOfBirth.toString())
         memberOfprojects[index]={...foundMember,name:name||foundMember.name,dateOfBirth:dateOfBirth||foundMember.dateOfBirth, email:email||foundMember.email,status:status||foundMember.status}
          }else{
            memberOfprojects[index]={...foundMember,name:name||foundMember.name, email:email||foundMember.email,status:status||foundMember.status}
          }
         
        return Promise.resolve( memberOfprojects[index])
    }else{
            throw new Error ("Không tìm thấy member cần sửa")
        }
    }catch(err){
        throw new Error (err)
    }
 }

export {listAllMembers,detailsOfMember,deleteMember,editMember};