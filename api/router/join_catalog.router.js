const Router = require('express')
const router = new Router()
const joinCatalogController = require('../controller/join_catalog.controller')

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@>
// создание каталога
// передать в body.data{join_catalog_name, catalog_id, product_id}
router.post('/join_catalog', joinCatalogController.createJoinCatalog)
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@>


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@>
// получение всего списка каталогов
router.get('/join_catalog', joinCatalogController.getJoinCatalog)
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@>



//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@>
// изменение каталога
// передать body.data={join_catalog_id, join_catalog_name, catalog_id, product_id }
router.put('/join_catalog', joinCatalogController.updateJoinCatalog)
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@>



//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@>
// получение списка каталогов
// передать body.data={id, key}
router.delete('/join_catalog', joinCatalogController.deleteJoinCatalog)
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@>


module.exports = router