const express = require('express');
const router = express.Router();
const {createCategory,getCategories} = require('../../controllers/Categories');
const {Auth,adminMiddleware} = require('../../middlewares/index')

router.post('/create', Auth,adminMiddleware, createCategory);
router.post('/', Auth,adminMiddleware, createCategory);

module.exports = router;