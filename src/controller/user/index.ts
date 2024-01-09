import { Request, NextFunction, Response } from "express";

import { createUser, userLogin } from "../../service/user/auth.user";

import {
  findProjects,
  taskInProjects,
  createTasksInProject,
  editTasksInProject,
} from "../../service/user/project.user";
import { showtasks, editTasks ,taskDelete} from "../../service/user/task.user";

const UserController = {
  makeNewUser: async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email, dateOfBirth } = req.body;
    createUser(username, password, email, dateOfBirth)
      .then((e) => res.status(200).json({ e }))
      .catch((err) => res.status(300).json({ err }));
  },

  findUserInProject: (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params;
    findProjects(username)
      .then((value) => {
        console.log();
        res.status(200).json(value);
      })
      .catch((err) => res.status(300).json({ err }));
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    userLogin(username, password)
      .then((e) => {
        console.log(e);
        return res.status(200).json(e);
      })
      .catch((err) => res.status(300).json({ Error: err.message }));
  },
  TasksOfUserInProject: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username, project } = req.params;

    taskInProjects(username, project)
      .then((e) => {
        console.log(e);
        return res.status(200).json(e);
      })
      .catch((err) => res.status(300).json({ Error: err.message }));
  },
  CreateTasksOfUserInProject: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username, project, name, description } = req.body;

    createTasksInProject(username, project, name, description)
      .then((e) => {
        console.log(e);
        return res.status(200).json(e);
      })
      .catch((err) => res.status(300).json({ Error: err.message }));
  },
  editTasksOfUserInProject: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const {
      username,
      project,
      taskname,
      type_name,
      priority,
      status,
      assign,
      start_date,
      end_date,
    } = req.body;
    editTasksInProject(
      username,
      project,
      taskname,
      type_name,
      priority,
      status,
      assign,
      start_date,
      end_date
    )
      .then((e) => {
        console.log(e);
        return res.status(200).json(e);
      })
      .catch((err) => res.status(300).json({ Error: err.message }));
  },
  showTasksOfUser: async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params;
    showtasks(username)
      .then((e) => {
        console.log(e);
        return res.status(200).json(e);
      })
      .catch((err) => res.status(300).json({ Error: err.message }));
  },
  editThisTask: async (req: Request, res: Response, next: NextFunction) => {
    const {username,project_name,description,task_name,type_name,priority,status,assignee,start_date,end_date,} = req.body;
    editTasks(username,project_name,description,task_name,type_name,priority,status,assignee,start_date,end_date).then((e) => {  return res.status(200).json(e);})
      .catch((err) => res.status(300).json({ Error: err.message }));
  },
  deleteThisTask: async (req: Request, res: Response, next: NextFunction) => {
    const {username,project_name,task_name} = req.body;
    taskDelete(username,project_name,task_name).then((e) => {  return res.status(200).json(e);})
      .catch((err) => res.status(300).json({ Error: err.message }));
  },
};

export { UserController };
