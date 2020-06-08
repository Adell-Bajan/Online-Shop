const router = require('express').Router();
const bodyParser = require('body-parser');
const authModel = require('../models/auth.model');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');

const authGuard = require('./guards/auth.guard')


// Controller auth
const authController = require('../controllers/auth.controller');



// route get signup
router.get("/signup", authGuard.notAuth, authController.getSignup);

// route post signup
router.post("/signup", authGuard.notAuth,
    bodyParser.urlencoded({ extended: true }),
    authController.postSignup
);


// route get login
router.get("/login", authGuard.notAuth, authController.getLogin);



// route post signup
router.post("/login", authGuard.notAuth,
    bodyParser.urlencoded({ extended: true }),
    authController.postLogin
);







// route all logout
router.all('/logout', authGuard.isAuth, authController.logout)


module.exports = router;






// Route get signup
// router.get('/signup', authController.getSignup);

// Route post signup
// router.post('/signup', bodyParser.urlencoded({ extended: true }),
//     authController.postSignup
// );
// Register Page
// router.get('/signup', (req, res) => res.render('signup'));



// // Register Handle
// router.post('/signup', (req, res) => {
//     const { username, email, password, confirmpassword } = req.body;
//     let errors = [];

//     // Check required fields
//     if (!username || !email || !password || !confirmpassword) {
//         errors.push({ msg: 'Please fill in all fields' });
//     }

//     // Check passwords match
//     if (password !== confirmpassword) {
//         errors.push({ msg: 'Passwords do not match' });
//     }

//     // Check pass length
//     if (password.length < 6) {
//         errors.push({ msg: 'Password should be at least 6 characters' });
//     }

//     if (errors.length > 0) {
//         res.render('signup', {
//             errors,
//             username,
//             email,
//             password,
//             confirmpassword
//         });
//     } else {
//         // Validation passed
//         authModel.findOne({ email: email })
//             .then(user => {
//                 if (user) {
//                     // User exists
//                     errors.push({ msg: 'Email is already registered' });
//                     res.render('signup', {
//                         errors,
//                         username,
//                         email,
//                         password,
//                         confirmpassword
//                     });
//                 } else {
//                     const newUser = new authModel({
//                         username,
//                         email,
//                         password
//                     });

//                     // Hash Password
//                     bcrypt.genSalt(10, (err, salt) =>
//                         bcrypt.hash(newUser.password, salt, (err, hash) => {
//                             if (err) throw err;
//                             // Set password to hashed
//                             newUser.password = hash;
//                             // Save user
//                             newUser.save()
//                                 .then(user => {
//                                     req.flash('success_msg', 'You are now registered and can log in');
//                                     res.redirect('/login');
//                                     // console.log(newUser);
//                                 })
//                                 .catch(err => console.log(err));
//                         }))

//                 }
//             });
//     }
// });

// route ge login
// router.get('/login', authController.getLogin);


// // Route post login
// router.post('/login', {

//     },
//     bodyParser.urlencoded({ extended: true }),
//     authController.postLogin
// );