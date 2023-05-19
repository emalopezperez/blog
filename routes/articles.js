const { Router } = require('express');
const multer = require('multer');
const articlesControllers = require('../controllers/articles');
const getItemsControllers = require('../controllers/articles')
const getItemControllers = require('../controllers/articles')
const deleteItemControllers = require('../controllers/articles')
const updateItemControllers = require('../controllers/articles')
const uploadFilesControllers = require('../controllers/articles')
const imagesControllers = require('../controllers/articles')
const buscarControllers = require('../controllers/articles')
const { verifyToken, isAdmin } = require('../middlewares/authJwt')

const router = Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './imagenes/articulos')
  },
  filename: (req, file, cb) => {
    cb(null, "articulo" + Date.now() + file.originalname)
  }
})

const uploads = multer({ storage: storage })

router.post('/create', [verifyToken, isAdmin], articlesControllers.create);
router.get('/articles/:home?', getItemsControllers.getItems)
router.get('/article/:id', getItemControllers.getItem)
router.delete('/article/:id', [verifyToken, isAdmin], deleteItemControllers.deleteItem)
router.put('/article/:id', [verifyToken, isAdmin], updateItemControllers.updateItem)
router.post('/subir-imagen/:id', [verifyToken, isAdmin], [uploads.single('file')], uploadFilesControllers.uploadFiles)
router.get('/imagen/:fichero', imagesControllers.image);
router.get('/buscar/:busqueda', buscarControllers.search)

module.exports = router;