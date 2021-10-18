const express = require('express');
const router = express.Router();
const multer = require('multer');
const {createProduct,getProduct} = require('../../controllers/Products');
const {Auth,adminMiddleware} = require('../../middlewares/index')
const shortid = require('shortid');
const path = require('path');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })

  const upload = multer({
    storage
});

router.post('/create', Auth,adminMiddleware, upload.array('productPictures'),createProduct);
router.get('/', Auth);

module.exports = router;