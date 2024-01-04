import {Router} from 'express'
const userRouter=Router()
import{UserController} from '../controller/user/index'

userRouter.post("/create",UserController.makeNewUser )
userRouter.get("/",UserController.findUserInProject )
export {userRouter}



