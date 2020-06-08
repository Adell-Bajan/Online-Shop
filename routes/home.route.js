const router = require('express').Router();

// Controller home router
const homeController = require('../controllers/home.controller');


// Router Get Home Page
router.get('/', homeController.getHome);



module.exports = router;