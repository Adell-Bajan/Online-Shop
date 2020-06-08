const express = require('express');
const path = require('path');
const db = require('./config/keys');
const session = require('express-session');
const flash = require('connect-flash');
const SessioStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');

// Init app
const app = express();

// Set  folder public
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'images')))


// Set view engine
app.set('view engine', 'ejs');
app.set('views', 'views') // defualt

// Body Parser
app.use(express.urlencoded({ extended: false }));


// Middeware Connect-flash
app.use(flash());




// SessionStore
const STORE = new SessioStore({
    uri: 'mongodb+srv://AdellTeam:Adell5594@cluster0-fbpua.mongodb.net/online-shop?retryWrites=true&w=majority',
    collection: 'sessions'
})

// Middleware
app.use(session({
    secret: 'this is my secret to hash express sessions ....',
    saveUninitialized: false,
    store: STORE
}))


// // Global Vars 
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
const homeRouter = require('./routes/home.route');
const productRouter = require('./routes/product.route');
const authRouter = require('./routes/auth.route');
const cartRouter = require('./routes/cart.route');
const adminRouter = require('./routes/admin.route');


// Middleware Router
app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/admin', adminRouter);


// app.get('/error', (req, res, next) => {
//     res.status(500);
//     res.render('error.ejs', {
//         isUser: req.session.userId,
//         isAdmin: req.session.isAdmin
//     })
// })

// app.use((error, req, res, next) => {
//     res.redirect('/error')
// })


// app.get('/not-admin', (req, res, next) => {
//     res.status(403);
//     res.render('not-admin', {
//         isUser: req.session.userId,
//         isAdmin: false,
//         pageTitle: 'Not Allowed'
//     });
// });



app.use((req, res, next) => {
    res.status(404);
    res.render('not-found', {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        pageTitle: "Page Not Found"
    });
});







// run server
app.listen(2000, () => {
    console.log('Server is runing on port 3000')
})