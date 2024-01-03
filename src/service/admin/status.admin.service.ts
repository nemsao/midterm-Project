import {listOfStatus,Status} from '../../model/status'
const getAllStatus=():Status[]=>{
   const list=listOfStatus.filter(e=>e.visible===false)
    return list
}
const hideThisStatus=(name:string ):Status[]|Error=>{
    const statusNeedToHide= listOfStatus.find(value=>value.name===name)
   
    if(statusNeedToHide){const index=listOfStatus.indexOf(statusNeedToHide)
        listOfStatus[index].visible=false
        
    }else{
       return new Error("Không tìm thấy Status")
    }
    const list=listOfStatus.filter(e=>e.visible===false)
    return list
}
const editStatus=async(name:string,order:number ):Promise<Status[]|Error>=>{
    const statusNeedToHide= listOfStatus.find(value=>value.name===name)
   
    if(statusNeedToHide){const index=listOfStatus.indexOf(statusNeedToHide)
        listOfStatus[index]={...listOfStatus[index],name:name,order:order}     
    }else{
        return new Error("Không tìm thấy Status")
    }
    const list=listOfStatus.filter(e=>e.visible===false)
    return list
 }
export {hideThisStatus,getAllStatus,editStatus}