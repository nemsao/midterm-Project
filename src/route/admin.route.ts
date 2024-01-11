import { Router } from "express";
import { controllerAdmin } from "../controller/admin";
import {authorizeMiddleware} from "../middleware/admin/auth"
const adminRouter = Router();
//for project
adminRouter.post(
  "/member/invite",
  authorizeMiddleware,
  controllerAdmin.MakeAnInvitation
);
adminRouter.post("/login", controllerAdmin.login);
adminRouter.get("/list", controllerAdmin.showProjectsController);
adminRouter.get(
  "/project/details/:id",authorizeMiddleware,
  controllerAdmin.projectDetailsController
);
adminRouter.post(
  "/project/add/:username",
  authorizeMiddleware,
  controllerAdmin.projectAddsController
);
adminRouter.put(
  "/project/edit/:oldname",
  authorizeMiddleware,
  controllerAdmin.projectEditsController
);
adminRouter.delete(
  "/project/delete/:name",
  authorizeMiddleware,
  controllerAdmin.projectDeleteController
);
adminRouter.get("/logout/:username",authorizeMiddleware, controllerAdmin.logout);
adminRouter.put("/member/add",authorizeMiddleware, controllerAdmin.projectAddPeople);
adminRouter.delete("/member/remove",authorizeMiddleware, controllerAdmin.projectRemovePeople);

//for user

adminRouter.get("/member/list", controllerAdmin.ShowAllMembers);
adminRouter.get("/member/:name", controllerAdmin.memberDetails);
adminRouter.delete("/member/:name",authorizeMiddleware, controllerAdmin.memberDelete);
adminRouter.put("/member/:name", authorizeMiddleware,controllerAdmin.memberEdit);

//for type
adminRouter.get("/type", controllerAdmin.seeAllType);
adminRouter.put("/type", controllerAdmin.editThisType);
adminRouter.post("/type", controllerAdmin.hideTheType);

// for status
adminRouter.get("/status", controllerAdmin.seeAllType);
adminRouter.put("/status", controllerAdmin.editThisType);
adminRouter.post("/status", controllerAdmin.hideTheType);

// for priority
adminRouter.post("/priority/add", controllerAdmin.addThisPriority);
adminRouter.get("/priority", controllerAdmin.seeAllPriority);
adminRouter.put("/priority", controllerAdmin.editThisPriority);
adminRouter.post("/priority", controllerAdmin.hideThisPriority);

//for task
adminRouter.get("/task", controllerAdmin.getAllTask);
adminRouter.put("/task", controllerAdmin.editThisTask);
adminRouter.post("/task", controllerAdmin.newTask);
adminRouter.delete("/task", controllerAdmin.deleteThisTask);
export { adminRouter };
