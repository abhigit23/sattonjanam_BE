const router = require('express').Router()
const authController = require('../controller/authController')

router.post(`/register`, authController.register)

router.post(`/login`, authController.login)

router.get(`/user/all`, authController.getAll)

router.get(`/user/single/:id`, authController.getSingle)

router.delete(`/delete/:id`, authController.delete)

module.exports = router
