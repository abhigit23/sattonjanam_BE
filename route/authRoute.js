const router = require('express').Router()
const authController = require('../controller/authController')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')

router.post(`/register`, authController.register)

router.post(`/login`, authController.login)

router.get(`/logout`, authController.logout)

router.get(`/auth/authToken`, authController.authToken)

router.get(`/auth/currentUser`, auth , authController.currentUser)

router.get(`/user/all`, authController.getAll)

router.get(`/user/single/:id`, authController.getSingle)

router.delete(`/delete/:id`, authController.delete)

router.post(`/sendmail`, authController.sendMail)

router.get(`/all/users`, auth, adminAuth, authController.allUsers)

router.patch(`/update/:id`, auth, adminAuth, authController.update)

module.exports = router
