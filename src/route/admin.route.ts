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
adminRouter.get("/type/list", controllerAdmin.seeAllType);
adminRouter.put("/member/:name", controllerAdmin.editThisType);
adminRouter.post("/member/:name", controllerAdmin.hideTheType);

export { adminRouter };
