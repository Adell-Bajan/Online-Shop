const router = require('express').Router();
const flash = require('connect-flash');
const multer = require('multer');

const adminController = require('../controllers/admin.controller');
const adminGuard = require('./guards/admin.guard');



// route get add product
router.get("/add", adminGuard, adminController.getAdd);



// route post add product
router.post('/add', adminGuard, multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        }
    })
}).single('image'), adminController.postAdd);



module.exports = router;