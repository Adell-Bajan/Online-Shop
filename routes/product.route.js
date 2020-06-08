const router = require('express').Router();

// Require controller product
const productController = require('../controllers/product.controller');


// route get product
router.get('/', productController.getProduct)

// Route product id
router.get('/:id', productController.getProductById);


module.exports = router;