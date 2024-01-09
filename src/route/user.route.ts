import {Router} from 'express'
const userRouter=Router()
import{UserController} from '../controller/user/index'

userRouter.post("/login",UserController.login )

userRouter.get("/:username/:project/task",UserController.TasksOfUserInProject )
userRouter.get("/:username/project",UserController.findUserInProject )
userRouter.post("/create",UserController.makeNewUser )
userRouter.post("/project/task/create",UserController.CreateTasksOfUserInProject )
userRouter.put("/project/task/edit",UserController.editTasksOfUserInProject )
// user /task
userRouter.get("/:username/task",UserController.showTasksOfUser )
userRouter.put("/task/edit",UserController.editThisTask )

userRouter.delete("/task/delete",UserController.deleteThisTask )
export {userRouter}



