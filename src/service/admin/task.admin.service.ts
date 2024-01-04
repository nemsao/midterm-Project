import { taskList, task } from "../../model/task";
import { types } from "../../model/type";
import { listOfStatus } from "../../model/status";
import { priorities } from "../../model/priority";
import {memberOfprojects}from "../../model/user"
const showtasks = (): Promise<task[] | Error> => {
  const listAfterSorted = taskList.sort((a, b) => {
    if (a.status.name != b.status.name) {
      return a.status.order - b.status.order;
    } else {
      return a.priority.order - b.priority.order;
    }
  });
  return Promise.resolve(listAfterSorted);
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
  name: string,
  description: string,
  project_name?: string,
  type?: string,
  priority?: string,
  status?: string,
  assignee?: string,
  start_date?: string,
  end_date?: string
): Promise<task[] | Error> => {
  try {
    const foundType = types.find((e) => e.name === type);
    const foundStatus = listOfStatus.find((e) => e.name === status);
    const foundPriority = priorities.find((e) => e.name === priority);
    const foundTask = await taskList.find((value) => value.name === name);
    const foundMember=memberOfprojects.find((value) => value.name === assignee);
    

    if (foundTask) {
      const re_start_date = new Date(
        start_date || foundTask.start_date || "0-0-2020"
      );
      const re_end_date = new Date(
        end_date || foundTask.end_date || "0-0-2020"
      );
      const index = taskList.indexOf(foundTask);
      taskList[index] = {
        ...foundTask,
        name: name || foundTask.name,
        description: description || foundTask.description,
        project: project_name || foundTask.project,
        type: foundType || foundTask.type,
        status: foundStatus || foundTask.status,
        priority: foundPriority || foundTask.priority,
        start_date: re_start_date,
        end_date: re_end_date,
        assign:foundMember||foundTask.assign
      };

      return Promise.resolve(taskList);
    } else {
      throw new Error("Không tìm thấy task cần sửa");
    }
  } catch (err) {
    throw new Error(err);
  }
};
const taskDelete = async (name: string,project:string): Promise<task[]> => {
    try {
      const foundTask = taskList.find((value) => value.name === name&&value.project===project);
      if (foundTask) {
        const index = taskList.indexOf(foundTask);
        taskList.splice(index, 1);
        return Promise.resolve(taskList);
      } else {
        throw new Error("Không tìm thấy task cần xoá");
      }
    } catch (err) {
      throw new Error(err);
    }
  };
export { showtasks, createTasks, editTasks,taskDelete };
