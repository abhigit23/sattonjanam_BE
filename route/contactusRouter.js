const router = require('express').Router()
const contactusController = require('../controller/contactusController')

router.post(`/create`, contactusController.createContactus)

router.post(`/sendmail`, contactusController.sendContactusMail)

router.post(`/sendmailuser`, contactusController.sendContactusMailuser)

module.exports = router