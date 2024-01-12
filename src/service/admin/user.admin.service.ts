import { memberOfprojects } from "../../model/user";
const IdArray:Record<string,string>[]=[]
const MakeinvitedId = (id:string,username:string,project?:string): object|Error => {
  if(IdArray.findIndex(e=>e.id===id)<0 ){
     IdArray.push({user:username,project:project||"Support New User"})
     return {id:id,user:username,project:project};
  }else{
     return new Error("Invited đã tồn tại")
  }
};

const listAllMembers = async (): Promise<any> => {
  if (memberOfprojects) {
    return Promise.resolve(memberOfprojects);
  } else {
    return new Error("không có thành viên nào");
  }
};
const detailsOfMember = async (name: string): Promise<any> => {
  const foundMember=memberOfprojects.find((value) => value.id === name)
  if(foundMember){
    delete foundMember.password
    return Promise.resolve(foundMember);
  }else{
    return Promise.reject(new Error("Can't find this person "))
  }
  
};

const deleteMember = async (name: string): Promise<any> => {
  try {
    const foundMember = await memberOfprojects.find(
      (value) => value.id === name
    );
    if (foundMember) {
      const index = memberOfprojects.indexOf(foundMember);
      memberOfprojects.splice(index, 1);
      return Promise.resolve(memberOfprojects.map(e=>{delete e.password;return e}));
    } else {
      throw new Error("Can' find this user to deleting ");
    }
  } catch (err) {
    throw new Error(err);
  }
};

const editMember = async (
  name?: string,
  dateOfBirth?: string | Date,
  email?: string,
  status?: string
): Promise<any> => {
  try {
    const foundMember = await memberOfprojects.find(
      (value) => value.name === name
    );
    if (foundMember) {
      const index = memberOfprojects.indexOf(foundMember);
      if (dateOfBirth) {
        dateOfBirth = new Date(dateOfBirth.toString());
        memberOfprojects[index] = {
          ...foundMember,
          name: name || foundMember.name,
          dateOfBirth: dateOfBirth || foundMember.dateOfBirth,
          email: email || foundMember.email,
          status: status || foundMember.status,
        };
      } else {
        memberOfprojects[index] = {
          ...foundMember,
          name: name || foundMember.name,
          email: email || foundMember.email,
          status: status || foundMember.status,
        };
      }
       const returnValue=memberOfprojects[index]
       delete returnValue.password
      return Promise.resolve(returnValue);
    } else {
      throw new Error("Không tìm thấy member cần sửa");
    }
  } catch (err) {
    throw new Error(err);
  }
};

export {MakeinvitedId,IdArray, listAllMembers, detailsOfMember, deleteMember, editMember };
