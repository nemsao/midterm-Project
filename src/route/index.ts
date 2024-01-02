import { Router } from "express";
import { controllerAdmin}from '../controller/admin'
const router=Router()

router.post  ('/admin/login',controllerAdmin.login)
router.get   ('/list', controllerAdmin.showProjectsController)
router.get   ('/project/details/:id',controllerAdmin.projectDetailsController)
router.post  ('/project/add/:username',controllerAdmin.authorizeMiddleware,controllerAdmin.projectAddsController)
router.put   ('/project/edit/:oldname',controllerAdmin.authorizeMiddleware,controllerAdmin.projectEditsController)
router.delete('/project/delete/:name',controllerAdmin.authorizeMiddleware,controllerAdmin.projectDeleteController)
router.get   ('/admin/logout/:username',controllerAdmin.logout)


export {router}