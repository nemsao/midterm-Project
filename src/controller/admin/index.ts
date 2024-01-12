declare module "bcrypt";
declare module "jsonwebtoken";
import {
  authenticate,
  invalidThisToken,
} from "../../service/admin/auth.admin.service";
import { NextFunction, Request, Response } from "express";
import {
  showProject,
  projectDetail,
  projectAdd,
  projectEdit,
  projectDelete,
  projectAddMember,
  projectRemoveMember,MakeAnInvitedId
} from "../../service/admin/project.admin.service";

import {
  listAllMembers,
  detailsOfMember,
  deleteMember,
  editMember,
} from "../../service/admin/user.admin.service";

import {
  editType,
  getAllType,
  hideThisType,
} from "../../service/admin/type.admin";

import {
  hideThisStatus,
  getAllStatus,
  editStatus,
} from "../../service/admin/status.admin.service";
import { getAllPriorities, hideThisPriority, editPriorities } from "../../service/admin/priority.admin.service";

import{
createTasks,
showtasks,editTasks,taskDelete
} from '../../service/admin/task.admin.service'
declare module "express" {
  interface Request {
    user: string;
  }
}
const controllerAdmin = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    const { id, password } = req.body;
    authenticate(id, password)
      .then((token) => {
        return res
          .header("Authorization", token)
          .status(200)
          .send({dataReturn:token ,message: "Successfully Login" });
      })
      .catch((err) => {
        return res.status(500).json({ message: err });
      });
  },
  
  logout: async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    const { id } = req.params;
    if (authorization) {
      try {
        invalidThisToken(id, authorization);
        return res.status(200).json({ Message: "tài khoản đăng xuât hợp lệ" });
      } catch (err) {
        return res
          .status(300)
          .json({ Error: "tài khoản đăng nhập không hợp lệ" });
      }
    } else {
      return res.status(300).json({ Error: "Chưa đăng nhập" });
    }
  },
  showProjectsController: (req: Request, res: Response, next: any) => {
    const list = showProject();
    return res.status(200).json(list);
  },
  projectDetailsController: (req: Request, res: Response, next: any) => {
    try {
      const project = projectDetail(req.params.id);
      return res.status(200).json(project);
    } catch (err) {
      return res.status(500).json({ Error: err.message });
    }
  },
  projectAddsController: (req: Request, res: Response, next: any) => {
    const { name, slug, start_date, end_date } = req.body;
    projectAdd(name, slug, start_date, end_date)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(500).json(err.message);
      });
  },
  projectEditsController: (req: Request, res: Response, next: any) => {
    const oldname = req.params.oldname;
    const { name, slug, start_date, end_date } = req.body;
    projectEdit(oldname, name, slug, start_date, end_date)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(500).json(err.message);
      });
  },
  projectDeleteController: async (req: Request, res: Response, next: any) => {
    const { name } = req.params;
    try {
      const data = await projectDelete(name);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  },

  projectAddPeople: async (req: Request, res: Response, next: any) => {
    const { project_name, name, role } = req.body;
    try {
      const project = await projectAddMember(project_name, name, role);
      res.status(200).json({ message: "Thêm thành công", project });
    } catch (err) {
      res.status(200).json({ Error: err.message });
    }
  },
  projectRemovePeople: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { project_name, id } = req.body;
    try {
      const project = await projectRemoveMember(project_name, id);
      res
        .status(200)
        .json({ message: "Loại 1 người ra khỏi dự án  thành công", project });
    } catch (err) {
      res.status(200).json({ Error: err.message });
    }
  },

  //user managing
  ShowAllMembers: async (req: Request, res: Response, next: NextFunction) => {
    try {
     await listAllMembers().then(data=>{return res.status(200).json({ message: "danh sách nhân viên ", data });});
      
    } catch (err) {
      res.status(200).json({ Error: err.message });
    }
  },
  memberDetails: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.params;
      const member = await detailsOfMember(name);
      res.status(200).json({ message: "danh sách nhân viên ", data: member });
    } catch (err) {
      res.status(200).json({ Error: err.message });
    }
  },
  memberDelete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.params;
      const member = await deleteMember(name);
      res
        .status(200)
        .json({ message: "danh sách nhân viên sau khi xoá ", data: member });
    } catch (err) {
      res.status(200).json({ Error: err.message });
    }
  },
  memberEdit: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.params;
      const { dateOfBirth, email, status } = req.body;
      const member = await editMember(name, dateOfBirth, email, status);
      res
        .status(200)
        .json({ message: "Thông tin nhân viên sau khi sửa ", data: member });
    } catch (err) {
      res.status(300).json({ Error: err.message });
    }
  },

  //type
  seeAllType: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const types = await getAllType();
      res.status(200).json({ message: "Thông tin cảu các type ", data: types });
    } catch (err) {
      res.status(200).json({ Error: err.message });
    }
  },
  editThisType: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, visible } = req.body;
      const editedType = await editType(name, visible);
      res.status(200).json(editedType);
    } catch (err) {
      res.status(200).json({ Error: err.message });
    }
  },
  hideTheType: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      const hidedType = await hideThisType(name);
      res.status(200).json(hidedType);
    } catch (err) {
      res.status(200).json({ Error: err.message });
    }
  },

  //status
  seeAllStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const statuses = await getAllStatus();
      res
        .status(200)
        .json({ message: "Thông tin cảu các status", data: statuses });
    } catch (err) {
      res.status(200).json({ Error: err.message });
    }
  },
  editThisStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, order } = req.body;
      const ListStatusesAfterEdited = await editStatus(name, order);
      res.status(200).json(ListStatusesAfterEdited);
    } catch (err) {
      res.status(200).json({ Error: err.message });
    }
  },
  hideTheStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      const hidedStatus = await hideThisStatus(name);
      res.status(200).json(hidedStatus);
    } catch (err) {
      res.status(200).json({ Error: err.message });
    }
  },
   

  //CONTROLLER FOR PRIORITY
  seeAllPriority: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const statuses = await getAllPriorities();
      res
        .status(200)
        .json({ message: "Thông tin cảu các status", data: statuses });
    } catch (err) {
      res.status(200).json({ Error: err.message });
    }
  },
  editThisPriority: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, order } = req.body;
      const ListStatusesAfterEdited = await editPriorities(name, order);
      res.status(200).json(ListStatusesAfterEdited);
    } catch (err) {
      res.status(200).json({ Error: err.message });
    }
  },
  hideThisPriority: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      const hidedStatus = await hideThisPriority(name);
      res.status(200).json(hidedStatus);
    } catch (err) {
      res.status(200).json({ Error: err.message });
    }
  },
//CONTROLLER FOR TASK

  getAllTask:async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await showtasks();
      res.status(200).json(data);
    } catch (err) {
      res.status(200).json({ Error: err.message });
    }
  },
  newTask:async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {name,description}=req.body
      const data = await createTasks(name,description);
      res.status(200).json(data);
    } catch (err) {
      res.status(200).json({ Error: err.message });
    }
  },
  editThisTask:async (req: Request, res: Response, next: NextFunction) => {
    try {
     
      const {name,description,project_name, type,priority,status, assignee, start_date,end_date}=req.body
      const data = await editTasks(name,description,project_name, type,priority,status, assignee, start_date,end_date);
      res.status(200).json(data);
    } catch (err) {
      res.status(200).json({ Error: err.message });
    }
  },
  deleteThisTask:async (req: Request, res: Response, next: NextFunction) => {
    try {
     
      const {name,project}=req.body
      const data = await taskDelete(name,project);
      res.status(200).json(data);
    } catch (err) {
      res.status(200).json({ Error: err.message });
    }
  },
  MakeAnInvitation:async (req: Request, res: Response, next: NextFunction) => {
    try {
     
      const {id,username,project}=req.body
      const data = await MakeAnInvitedId (id,username,project);
      
      res.status(200).json(data);
    } catch (err) {
      res.status(200).json({ Error: err.message });
    }
  },
  addThisPriority:async (req: Request, res: Response, next: NextFunction) => {
    try {
     
      const {name,order}=req.body
      const data = await MakeAnInvitedId (name,order);
      
      res.status(200).json(data);
    } catch (err) {
      res.status(200).json({ Error: err.message });
    }
  },
};
export { controllerAdmin };
