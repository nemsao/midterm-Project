import { project, projects } from "../../model/project";
import { task } from "../../model/task";
import { people } from "../../model/user";
import { type } from "../../model/type";
import { Status } from "../../model/status";
import { Priority } from "../../model/priority";
const findProjects = async (username: string): Promise<project[] | Error> => {
  const projectUserIntended = await projects.filter((e) => {
    const length = e.number_of_people?.filter((member) => {
      return member.id == username;
    }).length;
    return length ? length > 0 : false;
  });
  if (projectUserIntended.length > 0) {
    const modifiedProjects = projectUserIntended.map((e) => {
      const modifiedMembers = e.number_of_people?.map((memberObject) => {
        delete memberObject.password;
        return memberObject;
      });
      const modifiedTasks = e.list_of_task?.map((taskObject) => {
        delete taskObject.assign?.password;
        return taskObject;
      });
      
      return { ...e, number_of_people: modifiedMembers ,list_of_task:modifiedTasks};
    });
    
    return Promise.resolve(modifiedProjects);
  } else {
    return Promise.reject(new Error("KHONG CÓ TRONG DỰU ÁN NÀO "));
  }
};
const taskInProjects = async (username: string,project_name:string): Promise<task[] | Error> => {

    const projectFound = projects.find((value) => {
        return value.name === project_name;
      });
  const TaskOfUser = projectFound?.list_of_task?.filter(e=>e.assign?.id===username)
       const returnvalue=  TaskOfUser?.map(value=>{delete value.assign?.password ;return value;}) 
  if (returnvalue?.length) {
    return Promise.resolve(returnvalue);
  } else {
    return Promise.reject(new Error("Chua được phân công task nào "));
  }
};

const createTasksInProject =async (
    username:string,
    project_name:string,
    name: string,

    description: string
  ): Promise<task[] | Error> => {

    const newTask = new task(name, description)
    if(newTask)newTask.assign=new people("NV10",username,"")
    const taskInProject: task[] | Error = await taskInProjects(username, project_name);
      if(Array.isArray(taskInProject)){
        taskInProject.push(newTask)
          const listAfterSorted = taskInProject.sort((a, b) => {
      if (a.status.name != b.status.name) {
        return a.status.order - b.status.order;
      } else {
        return a.priority.order - b.priority.order;
      }
    });
    return Promise.resolve(listAfterSorted.map(e=>{delete e.assign?.password;return e}));
      }else{
        return Promise.reject(new Error("Không tìm thấy danh sách task "));
      }
  };

  const editTasksInProject =async (
    username:string,
    project_name:string,
    task_name: string,
    type_name?:string,
    priority?:string,
    status?:string,
    assignee?:string,
     start_date? :string,
     end_date?:string
  ): Promise<project|Error> => {
    
    const foundProject = projects.find(pj =>
        pj.number_of_people?.find(x => x.id === username) &&
        pj.name === project_name &&
        pj.list_of_task?.find(x => x.name === task_name)
      );
      
      if (foundProject) {
        const indexOfProject=projects.indexOf(foundProject)
        const foundTask = foundProject.list_of_task?.find(e => e.name === task_name);
        if (foundTask) {
        const foundTaskIndex=foundProject.list_of_task?.findIndex(e=>e.name===task_name)
          //@ts-ignore
          const foundTask = foundProject.list_of_task[foundTaskIndex]
          delete foundTask.assign?.password
          const startDate =start_date? new Date(start_date):foundTask.start_date
          const endDate =end_date? new Date(end_date):foundTask.end_date
          const newType=type_name?new type(type_name):foundTask.type
          const newStatus=status?new Status(status):foundTask.status
          const newPriority=priority?new Priority(priority,1):foundTask.priority
          const newAssignee=assignee?new people("NV9",assignee,""):foundTask.assign
          //@ts-ignore
          projects[indexOfProject].list_of_task[foundTaskIndex]={... projects[indexOfProject].list_of_task[foundTaskIndex],
           type: newType,priority:newPriority ,status:newStatus,end_date: endDate, start_date:startDate,assign:newAssignee }
           //@ts-ignore
            return Promise.resolve(projects[indexOfProject].list_of_task.map(e=>{delete e.assign?.password;return e}) );
        }else{
            return Promise.reject( new Error("Lỗi trong quá trình sửa task "));
        } 
      }else{
        return Promise.reject(new Error("Can't find this project "));
      }
  };


export { findProjects, taskInProjects ,createTasksInProject,editTasksInProject};
