import { taskList, task } from "../../model/task";
import { types } from "../../model/type";
import { listOfStatus } from "../../model/status";
import { priorities } from "../../model/priority";
import { taskesOfUser } from "../../model/project";
import { people } from "../../model/user";

const showtasks = (username: string): Promise<task[][] | Error> => {
  const taskListOfUser = taskesOfUser.filter((e) =>e.name===username).map(value=>value.project.list_of_task );
  if (taskListOfUser) {
   
    return Promise.resolve(taskListOfUser);
  } else {
    return Promise.reject(new Error("không có task nào"));
  }
};

const createTasks = (
  name: string,
  description: string
): Promise<task[] | Error> => {
  const newTask = new task(name, description);
  taskList.push(newTask);
  const listAfterSorted = taskList.sort((a, b) => {
    if (a.status.name != b.status.name) {
      return a.status.order - b.status.order;
    } else {
      return a.priority.order - b.priority.order;
    }
  });
  return Promise.resolve(listAfterSorted);
};
const editTasks = async (
  username:string,
  name: string,
  description: string,
  task_name:string,
  type?: string,
  priority?: string,
  status?: string,
  assignee?: string,
  start_date?: string,
  end_date?: string
): Promise<people[] | Error> => {
  try {
    const foundType = types.find((e) => e.name === type);
    const foundStatus = listOfStatus.find((e) => e.name === status);
    const foundPriority = priorities.find((e) => e.name === priority);
    const User = taskesOfUser.find((e) =>e.name===username)
    const foundTask= User?.project.list_of_task.find(value=>value.name===task_name )
    const foundMember = taskesOfUser.find((value) => value.name === assignee);

    if (foundTask&&User?.project.list_of_task) {
      const re_start_date = new Date(
        start_date || foundTask.start_date || "0-0-2020"
      );
      const re_end_date = new Date(
        end_date || foundTask.end_date || "0-0-2020"
      );
      const index = User.project.list_of_task.indexOf(foundTask);
      taskesOfUser[taskesOfUser.indexOf(User)].project.list_of_task[index] = {
        ...foundTask,
        name: name || foundTask.name,
        description: description || foundTask.description,
        type: foundType || foundTask.type,
        status: foundStatus || foundTask.status,
        priority: foundPriority || foundTask.priority,
        start_date: re_start_date,
        end_date: re_end_date,
        assign: foundMember || foundTask.assign,
      };

      return Promise.resolve(taskesOfUser);
    } else {
      throw new Error("Không tìm thấy task cần sửa");
    }
  } catch (err) {
    throw new Error(err);
  }
};



const taskDelete = async (username: string,task_name:string, project: string): Promise<people[]> => {
  try {
    
    const foundPeopleIndex = taskesOfUser.findIndex(
      (value) => value.name === username
    );
    if (foundPeopleIndex>0) {
      const foundTaskIndex=taskesOfUser[foundPeopleIndex].project.list_of_task.findIndex(e=>e.name===task_name)
     taskesOfUser[foundPeopleIndex].project.list_of_task.splice(foundTaskIndex-1,1)
      return Promise.resolve(taskesOfUser);
    } else {
      throw new Error("Không tìm thấy task cần xoá");
    }
  } catch (err) {
    throw new Error(err);
  }
};
export { showtasks, createTasks, editTasks, taskDelete };
