import { Router } from "express";
import { controllerAdmin } from "../controller/admin";
const adminRouter = Router();
//for project
adminRouter.post("/login", controllerAdmin.login);
adminRouter.get("/list", controllerAdmin.showProjectsController);
adminRouter.get(
  "/project/details/:id",
  controllerAdmin.projectDetailsController
);
adminRouter.post(
  "/project/add/:username",
  controllerAdmin.authorizeMiddleware,
  controllerAdmin.projectAddsController
);
adminRouter.put(
  "/project/edit/:oldname",
  controllerAdmin.authorizeMiddleware,
  controllerAdmin.projectEditsController
);
adminRouter.delete(
  "/project/delete/:name",
  controllerAdmin.authorizeMiddleware,
  controllerAdmin.projectDeleteController
);
adminRouter.get("/logout/:username", controllerAdmin.logout);
adminRouter.put("/add-member", controllerAdmin.projectAddPeople);
adminRouter.delete("/remove-member", controllerAdmin.projectRemovePeople);

//for user

adminRouter.get("/member/list", controllerAdmin.ShowAllMembers);
adminRouter.get("/member/:name", controllerAdmin.memberDetails);
adminRouter.delete("/member/:name", controllerAdmin.memberDelete);
adminRouter.put("/member/:name", controllerAdmin.memberEdit);

//for type
adminRouter.get("/type", controllerAdmin.seeAllType);
adminRouter.put("/type", controllerAdmin.editThisType);
adminRouter.post("/type", controllerAdmin.hideTheType);

// for status
adminRouter.get("/status", controllerAdmin.seeAllType);
adminRouter.put("/status", controllerAdmin.editThisType);
adminRouter.post("/status", controllerAdmin.hideTheType);

// for priority
adminRouter.get("/priority", controllerAdmin.seeAllPriority);
adminRouter.put("/priority", controllerAdmin.editThisType);
adminRouter.post("/priority", controllerAdmin.hideThisPriority);

//for task
adminRouter.get("/task", controllerAdmin.getAllTask);
adminRouter.put("/task", controllerAdmin.editThisTask);
adminRouter.post("/task", controllerAdmin.newTask);
adminRouter.delete("/task", controllerAdmin.deleteThisTask);
export { adminRouter };
