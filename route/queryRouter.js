const router = require('express').Router()
const queryController = require('../controller/queryController')

router.post(`/queryCreate`, queryController.createQuery)

router.post(`/sendQuery`, queryController.sendQueryMail)

module.exports = router