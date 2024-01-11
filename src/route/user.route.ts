import {Router} from 'express'
const userRouter=Router()
import{UserController} from '../controller/user/index'
import{authorizeMiddleware}from '../middleware/admin/auth'
userRouter.post("/login",UserController.login )

userRouter.get("/:username/:project/task",authorizeMiddleware,UserController.TasksOfUserInProject )
userRouter.get("/:username/project",authorizeMiddleware,UserController.findUserInProject )
userRouter.post("/create",authorizeMiddleware,UserController.makeNewUser )
userRouter.post("/project/task/create",authorizeMiddleware,UserController.CreateTasksOfUserInProject )
userRouter.put("/project/task/edit",authorizeMiddleware,UserController.editTasksOfUserInProject )
// user /task
userRouter.get("/:username/task",authorizeMiddleware,UserController.showTasksOfUser )
userRouter.put("/task/edit",authorizeMiddleware,UserController.editThisTask )

userRouter.delete("/task/delete",authorizeMiddleware,UserController.deleteThisTask )
export {userRouter}



