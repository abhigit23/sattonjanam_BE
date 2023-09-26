const router = require('express').Router()
const queryController = require('../controller/queryController')

router.post(`/queryCreate`, queryController.createQuery)

router.post(`/sendQuery`, queryController.sendQueryMail)

router.post(`/sendQueryuser`, queryController.sendQueryMailuser)

module.exports = router