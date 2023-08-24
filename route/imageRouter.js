const imageRoute = require('express').Router()
const imageController = require('../controller/imageController')

imageRoute.post(`/upload`, imageController.upload)
imageRoute.post(`/destroy`, imageController.destroy)

module.exports = imageRoute