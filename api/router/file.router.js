const Router = require('express')
const router = new Router()
const fileController = require('../controller/file.controller')

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@>
// создание каталога

// передать методом пост, название title: 'catalog'
router.post('/avatar', fileController.FileLoad)
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@>

module.exports = router