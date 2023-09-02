const router = require('express').Router()
const connectusController = require('../controller/connectusController')

router.post(`/create`, connectusController.createConnectus)

router.post(`/sendmail`, connectusController.sendConnectusMail)

module.exports = router