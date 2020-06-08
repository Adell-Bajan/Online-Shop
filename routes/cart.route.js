const router = require('express').Router();
const bodyParser = require('body-parser');
const flash = require('connect-flash');
// Authentication
const authGaurd = require('./guards/auth.guard');

const cartController = require('../controllers/cart.controller');


// Route get cart
router.get('/', authGaurd.isAuth, cartController.getCart);

// Router post cart 
router.post('/', authGaurd.isAuth, bodyParser.urlencoded({ extended: true }), cartController.postCart);

// Route post save cart
router.post('/save', authGaurd.isAuth, bodyParser.urlencoded({ extended: true }), cartController.postSave)


// Route post delete cart
router.post('/delete', authGaurd.isAuth, bodyParser.urlencoded({ extended: true }), cartController.postDelete)



module.exports = router;