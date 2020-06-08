// Require Model Products
const productsModel = require('../models/products.model')
const { ensureAuthenticated } = require('../config/auth');
// export controller get home
exports.getHome = (req, res, next) => {
    let errors = [];
    console.log(req.session.userId);
    let category = req.query.category
    let validCategories = ['clothes', 'phones', 'computers']
    let productsPromise
    if (category && validCategories.includes(category)) productsPromise = productsModel.getProductsByCategory(category)
    else productsPromise = productsModel.getAllProducts()
    productsPromise.then(products => {
        res.render('index', {
            products: products,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            pageTitle: 'Home'
        })
    })
}